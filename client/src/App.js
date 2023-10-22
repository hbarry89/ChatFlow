import './App.css';
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form } from 'react-bootstrap';

function App() {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [prevAnswer, setPrevAnswer] = useState("")

    const handleSubmit = function(event) {
        event.preventDefault();
        setQuestion(event.target.elements.question.value);
    };

    // useEffect(() => {}, []); // Basic useEffect Synax
    useEffect(function() {

        const getAnswer = async function() {
            let response = await fetch(`http://127.0.0.1:5000/ask?q=${question}`)
            response = await response.json();
            console.log(response);
            setAnswer(response.answers);
            setPrevAnswer( prev => prev +'\n\n\r'+ answer)
        };

        question !== '' && getAnswer()
        setQuestion('');
        
    }, [question]);

  return (
    <>
        <div className="parent">
                <div className="previous-answer">{prevAnswer}</div>
                
                <br/>
                
                <div className="current-answer">{answer}</div>
            </div>
            <div className="parent">
            <form className="form-container form-input" onSubmit={handleSubmit}>
                <input className="form-input form-control" type="text" name="question" />
                <input className="btn btn-secondary" type="submit" value="Ask" />
            </form>
        </div>
    </>
  );
}

export default App;