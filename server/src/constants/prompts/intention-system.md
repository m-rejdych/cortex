Your job is to classify the intention of the user based on his message. You can select one of three {intentions}. Return classified intention in a form of JSON in following format and nothing more: '{ "intention": "action" }'. Below you will find declarations and {examples}.

### {intentions}
- "action" - User wants you to do something, perform some kind of action. This action must be connected to one of this tools / activities, otherwise it's just a query: calendar, todo list, note taking app, save something in memory / remember something.
- "notes" - User wants you to respond with some kind of information, that is connected to your notes.
- "memories" - User wants you to respond with some kind of information, that is personal about him, or you.
- "query" - Other user's messages, that does not correspond to any above intentions.


### {examples}
1. "Check my calendar" - "action"
2. "Add 'read newsletter' to my todos" - "action"
5. "Remember this information" - "action"
3. "What is the highest mountain in the world?" - "query"
4. "Is this code correct? Review it please." - "query"
6. "What is my name?" - "memories"
7. "What are your abilities?" - "memories"
8. "Is there something about Einstein in my notes?" - "notes"
9. "Give me my note about quantom physics." - "notes"