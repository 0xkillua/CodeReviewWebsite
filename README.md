# CodeReviewWebsite

A simple web application for code review, built with Node.js and Next.js. It allows users to log in using their GitHub account, view their profile information, and engage in code reviews.

![CodeReviewWebsite Screenshot](https://i.imgur.com/your-screenshot.png) ## ✨ Features

* **GitHub Authentication:** Secure user login using Passport.js with the GitHub strategy.
* **User Profiles:** Once logged in, users can view their basic GitHub profile information.
* **CSRF Protection:** Implemented `csurf` to protect against Cross-Site Request Forgery attacks.
* **Flash Messages:** Utilizes `express-flash` to display flash messages for actions like failed login attempts.
* **Dynamic Views:** Uses the EJS view engine to render dynamic content.

## 🛠️ Technologies Used

* **Backend:** Node.js, Express.js
* **Authentication:** Passport.js, Passport-GitHub2
* **Templating Engine:** EJS
* **Security:** csurf, express-session, dotenv
* **Styling:** (Add any CSS frameworks or libraries used here, e.g., Bootstrap, Tailwind CSS)

| Technology  | Logo                                                                                                                 |
| :---------- | :------------------------------------------------------------------------------------------------------------------- |
| Node.js     | ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)               |
| Express.js  | ![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)         |
| Passport.js | ![Passport.js](https://img.shields.io/badge/Passport-34E27A?style=for-the-badge&logo=passport&logoColor=white)         |
| EJS         | ![EJS](https://img.shields.io/badge/EJS-B4CA65?style=for-the-badge&logo=ejs&logoColor=white)                             |
| GitHub      | ![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)                   |

## ⚙️ Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/CodeReviewWebsite.git](https://github.com/your-username/CodeReviewWebsite.git)
    cd CodeReviewWebsite
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root directory and add the following, replacing the placeholder values with your GitHub application credentials:
    ```
    SESSION_SECRET=your_session_secret
    GITHUB_CLIENT_ID=your_github_client_id
    GITHUB_CLIENT_SECRET=your_github_client_secret
    CALLBACK_URL=http://localhost:3000/auth/github/callback
    ```
    *You can obtain your GitHub client ID and secret by creating a new OAuth application on GitHub.*

4.  **Start the server:**
    ```bash
    npm start
    ```
    The application will be running at `http://localhost:3000`.

## 🚀 Usage

1.  Open your web browser and navigate to `http://localhost:3000`.
2.  Click on the "Login" button.
3.  You will be redirected to GitHub to authorize the application.
4.  After successful authentication, you will be redirected to your profile page, which will display your GitHub information.

## routes

* `GET /`: Home page.
* `GET /login`: Displays the login page.
* `POST /login`: Handles the login form submission (currently a placeholder).
* `GET /auth/github`: Initiates the GitHub authentication process.
* `GET /auth/github/callback`: The callback URL for GitHub authentication.
* `GET /profile`: Displays the user's profile page (requires authentication).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any bugs or feature requests.

## 📄 License

This project is licensed under the ISC License. See the `LICENSE` file for details.
