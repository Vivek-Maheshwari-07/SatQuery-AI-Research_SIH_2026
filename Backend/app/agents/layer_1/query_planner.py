class QueryPlanner:

    def plan(
        self,
        user_query: str,
        input_context
    ):

        query = user_query.lower()

        if "where" in query and "water" in query:
            return QueryPlan(
                intent="localization",
                task="water_localization",
                target="water",
                images_required=1,
                modalities=["optical"],
                requires_grounding=True,
                requires_segmentation=True,
                required_outputs=[
                    "location",
                    "evidence"
                ]
            )

        raise ValueError(
            "Query type not supported yet"
        )