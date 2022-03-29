import { Grid, Stack, Chip } from "@mui/material";
import React from "react";
import ButtonAudio from "../shared/ButtonAudio";

const SearchResult = ({ word }) => {
  return (
    <Grid container style={{ padding: 10 }}>
      <Grid item xs={12} sm={12}>
        <h2>{word?.word}</h2>
        <Stack className="example_stack" spacing={1}>
          {word?.phonetics?.length > 0
            ? word?.phonetics?.map((p, f) => (
                <React.Fragment key={f}>
                  {p?.text && p?.audio ? (
                    <Chip
                      size='medium'
                      avatar={
                        <ButtonAudio src={p?.audio} id={`${p?.text}${f}`} />
                      }
                      label={p?.text}
                      variant="outlined"
                    />
                  ) : (
                    ""
                  )}
                </React.Fragment>
              ))
            : ""}
        </Stack>
        <div>
          <strong>Meanings</strong>
          <div>
            {word?.meanings?.map((e, i) => (
              <div key={i}>
                <strong>{`(${e?.partOfSpeech})`}</strong>
                {e?.definitions?.length > 0 ? (
                  <div>
                    {e?.definitions?.map((v, k) => (
                      <div key={k}>
                        <small>{`- ${v?.definition}`}</small>
                      </div>
                    ))}
                  </div>
                ) : (
                  ""
                )}
                {e?.synonyms?.length > 0 ? (
                  <div>
                    <p><strong>Synonyms</strong></p>
                    <Stack className="example_stack" spacing={1}>
                      {e?.synonyms?.map((s, l) => (
                          <Chip key={l} size="small" label={s} variant="outlined" />
                      ))}
                    </Stack>
                  </div>
                ) : (
                  ""
                )}
                {e?.antonyms?.length > 0 ? (
                  <div>
                    <p><strong>Antonyms</strong></p>
                    <Stack className="example_stack" spacing={1}>
                      {e?.antonyms?.map((s, m) => (
                          <Chip key={m}
                            size="small"
                            label={s}
                            color="error"
                            variant="outlined"
                          />
                      ))}
                    </Stack>
                  </div>
                ) : (
                  ""
                )}
              </div>
            ))}
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default SearchResult;
