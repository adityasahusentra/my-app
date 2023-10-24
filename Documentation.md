### Home Screen:
1. **Start Button:**
   - Display a "Start" button to begin the quiz.
   - On button click, initiate an API request to start a new quiz and fetch questions.

### Question Screen:
2. **Display Question:**
   - Show the question text to the user.
   - Optionally display an image associated with the question.
   
3. **Display Choices:**
   - Present the answer choices to the user.
   - Allow the user to select one or more choices (depending on the question type).
   
4. **Submit Answer:**
   - Prevent the user from proceeding until at least one choice is selected.
   - When the user submits their answer(s), make an API request to submit the selected choices along with the time taken to answer the question.

5. **Navigation:**
   - Provide navigation buttons to move to the next question.
   - Allow the user to go back to the previous question if needed.

### Report Screen:
6. **Display Score:**
   - Show the total score achieved by the user.
   - Display the number of correct and incorrect answers.
   
7. **Start Again Button:**
   - Allow the user to retake the quiz from the beginning.
   - On button click, reset the quiz and navigate back to the Home screen.

### General UI Elements (for all screens):
8. **Loading Indicators:**
   - Display loading indicators when waiting for API responses to enhance user experience.
   
9. **Error Messages:**
   - Show error messages if there are issues with API requests or if the user submits invalid data.
   
10. **Timer (Optional):**
    - Optionally, include a timer to track the time taken by the user to answer each question.

11. **Styling:**
    - Apply CSS styles to create a visually appealing and user-friendly interface.
    
12. **Accessibility:**
    - Ensure your UI elements are accessible, allowing users with disabilities to interact with your application.

Remember, these functionalities should be implemented according to the design provided or your specific design requirements. Each functionality corresponds to a user interaction or system behavior, and your UI components and logic should handle these interactions gracefully.

Based on the requirements of the project, you will need to create the following API endpoints:

1. **Start a New Quiz:**
   - Endpoint: `/api/quiz/start`
   - Method: `POST`
   - Description: This endpoint initiates a new quiz session and fetches the initial set of questions for the user.

2. **Fetch Questions:**
   - Endpoint: `/api/questions`
   - Method: `GET`
   - Description: This endpoint retrieves the next question for the user during the quiz session.

3. **Submit User's Answer:**
   - Endpoint: `/api/questions/submit`
   - Method: `POST`
   - Description: This endpoint receives the user's selected answer(s) for a question, along with the time taken to answer. The submitted data includes the question ID and the selected answer(s).

4. **Finish the Quiz and Get Score Report:**
   - Endpoint: `/api/quiz/finish`
   - Method: `POST`
   - Description: This endpoint marks the end of the quiz session, calculates the user's score based on their answers, and provides a score report. It should include details like the total score, number of correct and incorrect answers, and any other relevant information.



