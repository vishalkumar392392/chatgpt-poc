import {
  Button,
  CircularProgress,
  MenuItem,
  TextareaAutosize,
  TextField,
  Typography
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import "./App.css";
function App() {
  const [question, setQuestion] = useState("");
  const [tags, setTags] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [dropdown, setDropdown] = useState("Model 1");

  useEffect(() => {
    console.log("dropdown", dropdown);
  }, [dropdown]);

  const handleChange = (event) => {
    setQuestion(event.target.value);
  };

  const handleRequest = async () => {
    setLoading(true);
    const response = await fetch(
      "https://dummyjson.com/products/?limit=10&skip=5&select=key1&select=key2&select=key3",
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: [question] }),
      }
    );
    const json = await response.json();
    setResponse(json.products.map((product) => product.id));
    setLoading(false);
  };

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        backgroundColor: "#96cde7",
        position: "absolute",
        overflow: "scroll",
      }}
    >
      <Box
        sx={{
          // position: "absolute",
          m: "5rem 12rem",
          px: 5,
          py: 10,
          backgroundColor: "#c1e5f1",
          fontSize: "18px",
          fontFamily: "sans-serif",
          borderRadius: "6px",
          boxShadow: "2px 4px 8px rgb(68, 67, 67)",
          maxWidth: "70%",
        }}
      >
        <Box>
          <Typography
            textAlign={"center"}
            marginBottom={4}
            fontSize="24px"
            fontFamily={"revert-layer"}
          >
            Chat GPT API
          </Typography>
        </Box>
        <Box display="flex" flexDirection={"column"} gap={2}>
          <label>Select a Model</label>
          <TextField
            id="outlined-select-currency"
            select
            defaultValue={dropdown}
            size="small"
            style={{ width: "300px", backgroundColor: "white" }}
            onChange={(event) => setDropdown(event.target.value)}
          >
            {[
              { label: "Model 1", value: "Model 1" },
              { label: "Model 2", value: "Model 2" },
            ].map((option) => (
              <MenuItem key={option.label} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        <Box display="flex" flexDirection={"column"} gap={2} marginTop={4}>
          <label>Enter your question</label>
          <TextField
            onChange={handleChange}
            value={question}
            size="meduim"
            sx={{ width: "70%", backgroundColor: "white" }}
          ></TextField>
        </Box>
        {dropdown === "Model 2" && (
          <Box display="flex" flexDirection={"column"} gap={2} marginTop={4}>
            <label>Enter your tags</label>
            <TextField
              onChange={(event) => setTags(event.target.value)}
              value={tags}
              size="meduim"
              sx={{ width: "70%", backgroundColor: "white" }}
            ></TextField>
          </Box>
        )}

        <Box display="flex" alignItems={"center"} gap={2}>
          <Button
            variant="contained"
            sx={{ my: 2 }}
            onClick={handleRequest}
            size="large"
          >
            Send
          </Button>
          {loading && <CircularProgress sx={{ fontSize: "small" }} />}
        </Box>

        <Box display="flex" flexDirection={"column"} gap={2} marginTop={2}>
          <label>Response</label>
          <TextareaAutosize
            minRows={6}
            aria-label="empty textarea"
            placeholder="Response"
            style={{ width: "70%", backgroundColor: "white" }}
            defaultValue={response}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default App;
