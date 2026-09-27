from pydantic import BaseModel
from app.schemas.input import InputContext

class ValidatorInput(BaseModel):
    user_query: str
    input_context: InputContext
