import { Button, CircularProgress, TextareaAutosize, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setQuestion(event.target.value);
  };

  const handleRequest = async () => {
    setLoading(true);
    const response =  await fetch('https://dummyjson.com/products/?limit=10&skip=5&select=key1&select=key2&select=key3');
    const json = await response.json();
    setResponse(json.products.map(product => product.id))
    setLoading(false);

  }
  
  return (
    <Box sx={{ mx: 20, mt: 10, px: 5, py: 10, backgroundColor: "whitesmoke" }}>
      <Box>
        <Typography textAlign={"center"} marginBottom={4}>
          Chat GPT API
        </Typography>
      </Box>
      <Box display="flex" flexDirection={"column"} gap={2}>
        <label>Enter your question</label>
        <TextField onChange={handleChange} value={question} size="small"></TextField>
      </Box>

      <Box display="flex" flexDirection={"column"} gap={2} marginTop={2}>
        <label>Response</label>
        <TextareaAutosize
        minRows={4}
        aria-label="empty textarea"
        placeholder="Response"
        style={{ width: 200 }}
        defaultValue={response}
      />
      </Box>
      <Box display="flex" alignItems={"center"} gap={2}>
      <Button variant="contained" sx={{my:2}} onClick={handleRequest} size="large" >
        Send
      </Button>
      {loading && <CircularProgress sx={{fontSize:"small"}} />}

      </Box>
    </Box>
  );
}

export default App;
