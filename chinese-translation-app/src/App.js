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
import { Container } from "@mui/material";
import pinyin from "pinyin";

function App() {
  let [mainText, setMainText] = useState("");
  let pinyinText = [];
  let chineseText = [];
  let pinyinDisplay = "";

  useEffect(() => {
    chineseText = [...mainText];
    pinyinText = pinyin(mainText).map((word) => word[0]);
    pinyinDisplay = pinyinText.map((word, index) => {
      return (
        <span key={index}>
          {word} {chineseText[index]}
        </span>
      );
    });
  }, [mainText]);

  console.log(pinyinText);
  console.log(chineseText);

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            id="outlined-multiline-static"
            label="Multiline"
            multiline
            rows={32}
            defaultValue=""
            variant="outlined"
            fullWidth
            onChange={(e) => setMainText(e.target.value)}
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
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained">Translate</Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
