import {FC, SyntheticEvent, useState} from "react";
import {Accordion, AccordionDetails, AccordionSummary, Box, Container, Typography} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {useFlags} from "@flags-gg/react-library";

interface Question {
  question: string;
  answer: string;
}

const questions: Question[] = [
  {
    question: 'What does request mean?',
    answer: 'When a user visits your site, and you are using Flags.gg, a request is made to our servers to determine which features to show the user. This is called a request.',
  },
  {
    question: 'Is there a way to experiment with the flags on the fly',
    answer: 'Yes, you can use the Flags.gg dashboard to change the flags in real-time and see the changes on your site, you can also use the "secret menu", press B on the keyboard 5 times to access it.',
  }
]

const FAQ: FC = () => {
  const [expanded, setExpanded] = useState<string | false>(false);
  const {is} = useFlags();

  const handleChange = (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  if (!is("faq").enabled()) {
    return null
  }

  return (
    <Container
      maxWidth={false}
      id="faq"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 3, sm: 6 },
      }}
    >
      <Typography
        component="h2"
        variant="h4"
        color="text.primary"
        sx={{
          width: { sm: '100%', md: '60%' },
          textAlign: { sm: 'left', md: 'center' },
        }}
      >
        Frequently asked questions
      </Typography>
      <Box sx={{ width: '100%' }}>
        {questions.map((question, index) => (
          <Accordion
            key={index}
            expanded={expanded === `panel${index + 1}`}
            onChange={handleChange(`panel${index + 1}`)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${index + 1}d-content`}
              id={`panel${index + 1}d-header`}
            >
              <Typography component="h3" variant="subtitle2">
                {question.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography
                variant="body2"
                gutterBottom
                sx={{ maxWidth: { sm: '100%', md: '70%' } }}
              >
                {question.answer}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Container>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default FAQ
