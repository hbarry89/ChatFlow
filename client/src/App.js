import './App.css';
import { useEffect, useState } from 'react';

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
            setAnswer(response.answers);
            setPrevAnswer( prev => prev +'\n\n\r'+ answer)
        };

        question !== '' && getAnswer()
        setQuestion('');
        
    }, [question]);

  return (
    <>
        <pre>
            {prevAnswer}<br/>
            {answer}
        </pre>

        <form onSubmit={handleSubmit}>
        <input type="text" name="question" />
        <input type="submit" value="Ask" />
        </form>
    </>
  );
}

export default App;
