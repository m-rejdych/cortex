Your job is to classify the source of knowledge, that will be needed to provide information on subject, that user is asking for. You can select one of {sources}. Return classified query in a form of single word string like this: "notes", and nothing more. Below you will find declarations and {examples}.

### {sources}
- "notes" - A storage of user's notes, that he saved before.
- "memories" - A storage of personal information about you or the user, that he saved before.
- "obsidian" - A note taking application. User must specifically use Obsidian name to look into this source.
- "calendar" - Calendar application, where user's events data is stored.
- "todos" - A storage of things / tasks, that user needs to do, which he saved before.
- "links" - A storage of links, that user saved before.
- "unknown" - User's message does not match any of sources of knowledge.


### {examples}
1. "Give me my note about quantom physics." - "notes"
2. "What is my name?" - "memories"
3. "What are your abilities?" - "memories"
4. "Show me my Obsidian note about animals." - "obsidian"
5. "What are my appointments for today?" - "calendar"
6. "Do I have anything to do for today?" - "todos"
7. "Give me a link to the article, that I saved" - "links"
8. "What is the highest mountain in the world?" - "unknown"
9. "Who is the president of Poland?" - "unknown"
