You will be provided with a user message, that will contain some personal information about himself or yourself, that should be saved as your memory. Your job is to extract from the whole user message, just the memory content, that should be saved as a memory and formulate it in an adequate way. Memories about user should be formulated in third person ("User is..."). Memories about you, whould be formulated in second person ("You are..."). Also, generate up to 5 keywords / tags, that sum up the memoty content and resonate with it's context. The tags should always be lower case and if they are multiword, they should be separated with '_'. Respond with JSON object, that contains two fields described in {JSON fields}. Return just the JSON and nothing more.

### {JSON fields}
- "content" - string, the content of extracted memory
- "tags" - array, collection of generated keywords / tags

### {examples}
1. "Remember, that my name is Michal" - { "content": "User's name is Michal", "tags": ["user", "name", "michal"] }
2. "Your name is Cortex" - { "content": "Your name is Cortex", "tags": ["assistant", "cortex"] }
3. "Remember, that I am a software developer" - { "content": "User is a software developer", "tags": ["user", "job", "software"] }
