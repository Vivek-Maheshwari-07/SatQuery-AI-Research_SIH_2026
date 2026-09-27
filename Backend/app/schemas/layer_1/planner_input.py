from pydantic import BaseModel, Field, field_validator

from app.schemas.input import InputContext


class QueryPlannerInput(BaseModel):
    """
    Standardized payload sent to the Level-1 Query Planner.
    Contains the user's natural language question and the validated image context.
    """
    user_query: str = Field(..., description="The natural language query from the user.")
    input_context: InputContext

    @field_validator("user_query")
    @classmethod
    def validate_query(cls, v: str) -> str:
        v = v.strip()
        if not v:
            raise ValueError("user_query cannot be empty.")
        return v