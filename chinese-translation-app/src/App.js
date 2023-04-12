/**
 * This is the main component of the app.
 *
 * It shows a main window for typing/pasting chinese text.
 *
 * There will be a section at the bottom with 2 boxes and a button. The user can highlight text in the main window and click to
 * move the text into the left box. The user can then click the button to translate the text in the left box and a translation will appear in the right box.
 */
import React, { Component, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { Container, Typography } from "@mui/material";
import pinyin from "pinyin";
import { translateText } from "./TranslatorService";

function App() {
  let [mainText, setMainText] = useState("");
  let [highlightedText, setHighlightedText] = useState("");
  let [fixedText, setFixedText] = useState(false);
  let [snippetText, setSnippetText] = useState("");
  let [translatedText, setTranslatedText] = useState("");
  let [loading, setLoading] = useState(false);
  let pinyinText = [];
  let chineseText = [];
  let [pinyinDisplay, setPinyinDisplay] = useState([]);

  useEffect(() => {
    pinyinText = pinyin(mainText).map((word) => {
      return word[0];
    });
    console.log(pinyinText);
    chineseText = [...mainText];
    pinyinDisplay = pinyinText.map((word, index) => {
      return {
        chinese: chineseText[index],
        pinyin: word,
      };
    });
    console.log(pinyinDisplay);
    setPinyinDisplay(pinyinDisplay);
  }, [mainText]);

  console.log(pinyinDisplay);

  const handleHighlight = (e) => {
    let selection = window.getSelection();
    let selectedText = selection.toString();
    setHighlightedText(selectedText);
  };

  let textArea = null
  if (!fixedText) {
    textArea = (
      <TextField
            id="outlined-multiline-static"
            label="Multiline"
            multiline
            rows={32}
            defaultValue=""
            variant="outlined"
            fullWidth
            value={mainText}
            onChange={(e) => setMainText(e.target.value)}
          />
    )
  } else {
    // display each Mandarin word with its Pinyin representation above it
    let pinyinString = pinyinDisplay.map((word) => {
      return word.pinyin + " ";
    });
    textArea = (
      <div>
        <Typography variant="h6">
          {mainText}
        </Typography>
        <Typography variant="h6">
          {pinyinString}
        </Typography>
      </div>
    )
  }

  return (
    <Container maxWidth="md">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {textArea}
        </Grid>
        <Grid item xs={12}>
          <Button 
            variant="contained"
            onClick={() => {
              setFixedText(!fixedText);
            }}
            >
            {fixedText ? "Edit" : "Done"}
          </Button>
        </Grid>

        <Grid item xs={6}>
          <TextField
            id="outlined-multiline-static"
            label="Multiline"
            multiline
            rows={16}
            defaultValue="Default Value"
            variant="outlined"
            value={snippetText}
            onChange={(e) => setSnippetText(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="outlined-multiline-static"
            label="Multiline"
            multiline
            rows={16}
            defaultValue="Default Value"
            variant="outlined"
            value={
              loading ? "Loading..." : translatedText  
            }
            onChange={(e) => setTranslatedText(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Button 
            variant="contained"
            onClick={() => {
              setLoading(true);
              translateText(snippetText).then((response) => {
                setTranslatedText(response);
                setLoading(false);
              });
            }}
            disabled={loading}
          >
            Translate
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
