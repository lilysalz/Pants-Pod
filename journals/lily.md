## January 19, 2024
Today we finished backend auth! Finally! We all organized our code in pretty different ways. For example, I created a models.py file to keep all my models like the AccountForm and AccountToken classes (described in the JWTdown documentation) while Omari put them in the router file that was calling them. Since my computer was running slowly and Noah got all of his code to work, once I felt like I understood how to set up our backend auth, I decided to just adapt his code. Today has been a good exercise in understand how other people code opposed to just figuring out how I would get the 'right answer'.

## January 18, 2024
Today, the team worked on backend authentication. None of us had done it before, so we all wanted to try to set it up individually. This took a while but figured it was better for our learning experience. No one of us got ours to work yet so hopefully we will finish tomorrow. It took me so long to make any progress because I kept having to rebuild my docker images and my computer wouldn't function for a while after doing so. I've learned that I will need to get more memory on my computer in order to work efficiently on this project. 

## January 17, 2024

Today I worked on:

-   Restructuring the data and the API endpoints.

Today, we realized that in order to practice normalization, we could structure our data better. We went back and forth on a few ideas - the two best ones being:

1.  We have a table for episodes, one for users, and one for user's episodes and comments. The user's episode and comments table would have a user ID (FK), comment ID (FK), Episode ID (FK), and liked status (bool). This idea, in theory, would work for what we want but combining user's comments and liked episodes would create a lot of undesired data to sort through.
2.  (The idea we went with) We have a table for episodes, one for users, one for comments, and one for liked episodes. Originally, we had this set up, but the liked episodes table and episodes table had too much overlap. This time around (for normalization) liked episodes just have a user ID, episode ID, and liked episode ID.


## January 16, 2024

Today I worked on:

-   Drawing out the data structure

-   Setting up the project

Today, the team created the project; set up the database; got our docker up and running; and started working on api endpoints.

We were originally getting an error because our PostgreSQL services section was below our fastapi services section in our docker-compose.yaml file. So, today, I learned that the order of the services in the yaml file is important.
