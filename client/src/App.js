import './App.css';
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form } from 'react-bootstrap';

function App() {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [prevAnswer, setPrevAnswer] = useState("");

    const handleSubmit = function (event) {
        event.preventDefault();
        const userQuestion = event.target.elements.question.value;
        setQuestion(userQuestion);
    };

    useEffect(() => {
        const getAnswer = async function () {
            if (question.trim() !== '') {
                try {
                    const response = await fetch(`http://127.0.0.1:5000/ask?q=${question}`);
                    const data = await response.json();
                    setAnswer(data.answers);
                    setPrevAnswer(prev => prev + '\n\n\r' + question + '\n\n\r' + data.answers);
                } catch (error) {
                    console.error(error);
                }
            }
        };

        getAnswer();
    }, [question]);

    return (
        <>
            <div className="parent row">
                <div className="previous-answer col-12">{prevAnswer}</div>
                <br />
                <div className="current-question col-12">{question}</div>
                <br />
                <div className="current-answer col-12">{answer}</div>
            </div>
            <div className="parent">
                <form className="form-container form-input" onSubmit={handleSubmit}>

                    
                    <div className="input-group mb-3">
                        <input type="text" name="question" className="form-control" placeholder="Send a message" aria-describedby="button-addon2" />
                        <button className="btn btn-outline-secondary" type="submit" value="Ask" id="button-addon2">Send</button>
                    </div>

                </form>
            </div>
        </>
    );
}

export default App;
