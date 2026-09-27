import os
from typing import Type, TypeVar
from pydantic import BaseModel
from app.core.config import settings
from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import JsonOutputParser

T = TypeVar('T', bound=BaseModel)

class LLMClient:
    """
    Centralized LLM client for generating structured Pydantic outputs using Groq.
    Uses JsonOutputParser instead of Tool Calling to support custom/hackathon models.
    """

    def __init__(self, model_name: str = "allam-2-7b"):
        self.model_name = model_name
        self.llm = ChatGroq(
            model=self.model_name,
            temperature=0,
            api_key=settings.GROQ_API_KEY or os.getenv("GROQ_API_KEY")
        )

    def generate_structured_output(
        self, 
        system_prompt: str, 
        user_prompt: str, 
        response_model: Type[T]
    ) -> T:
        """
        Calls the Groq LLM with the provided prompts and forces it to return
        JSON matching the provided Pydantic `response_model` via Prompt Engineering.
        """
        
        parser = JsonOutputParser(pydantic_object=response_model)
        
        prompt = ChatPromptTemplate.from_messages([
            ("system", "{system_prompt}\n\n"
                       "CRITICAL INSTRUCTIONS:\n"
                       "1. You must generate an ACTUAL JSON DATA OBJECT containing the answers to the prompt.\n"
                       "2. Return ONLY valid JSON. No markdown blocks like ```json, no explanations, no text before or after."),
            ("human", "{user_prompt}")
        ])
        
        # Create chain using standard LLM (no tool calling) + JsonOutputParser
        chain = prompt | self.llm | parser
        
        max_retries = 2
        for attempt in range(max_retries):
            try:
                # Execute chain
                result_dict = chain.invoke({
                    "system_prompt": system_prompt,
                    "user_prompt": user_prompt
                })
                
                # Parse dict back to Pydantic object to guarantee schema matching
                return response_model.model_validate(result_dict)
                
            except Exception as e:
                if attempt < max_retries - 1:
                    print(f"\n[WARNING] LLM output parsing failed. Retrying ({attempt + 1}/{max_retries})...")
                    continue
                else:
                    print(f"\n[CRITICAL ERROR] The LLM returned invalid data that didn't match the schema.\nRAW LLM OUTPUT:\n{locals().get('result_dict', 'No Dict Generated')}\n")
                    raise e
