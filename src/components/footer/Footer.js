import "./Footer.css"

export const Footer = () => {


    return (
        <footer>
            <p className="name-and-desc">
                Hello, I am William Briscoe, a web developer currently looking for work.
                I built this full-stack website using JavaScript React for the frontend
                and Python Django for the backend.
            </p>
            <ul className="contact-links">
                <li className="git">

                    <a href="https://github.com/William-Briscoe" target="_blank" rel="noopener noreferrer">
                        <svg className="git-icon" xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" width="24" height="24">
                            <path d="M12 0C5.4 0 0 5.4 0 12c0 5.3 3.4 9.8 8.1 11.4.6.1.8-.3.8-.6v-2.1c-3.3.7-4-1.6-4-1.6-.5-1.4-1.3-1.8-1.3-1.8-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 1.8 2.6 1.3 3.3 1 .1-.7.4-1.3.8-1.6-3-.3-6.2-1.5-6.2-6.9 0-1.5.6-2.8 1.7-3.8-.2-.3-.7-1.8.1-3.7 0 0 1.2-.4 3.9 1.4 1.1-.3 2.3-.4 3.5-.4s2.4.1 3.5.4c2.7-1.8 3.9-1.4 3.9-1.4.8 1.9.3 3.4.1 3.7 1.1 1 1.7 2.2 1.7 3.8 0 5.5-3.2 6.6-6.2 6.9.5.4.9 1.1.9 2.2v3.3c0 .3.2.7.8.6 4.7-1.6 8.1-6.1 8.1-11.4C24 5.4 18.6 0 12 0z" />
                        </svg>GitHub</a>
                </li>
                <li className="linkedin">

                    <a href="https://www.linkedin.com/in/william-briscoe-j187/" target="_blank" rel="noopener noreferrer">
                        <svg className="linkedin-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white">
                            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle>
                        </svg>LinkedIn
                    </a>
                </li>
                <li className="email">

                    <a href="mailto:will.m.briscoe@gmail.com">
                        <svg className="mail-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94"></path></svg>will.m.briscoe@gmail.com</a>
                </li>
            </ul>
        </footer>
    )
}