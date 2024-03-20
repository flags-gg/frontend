import {FC, useState} from "react";
import {Box, Button, Card, Chip, Container, Grid, Stack, Typography} from "@mui/material";

interface Feature {
  title: string;
  description: string;
  icon: string;
  image: string;
}

const items: Feature[] = [
  {
    title: 'Feature 1',
    description: 'Description 1',
    icon: 'icon1',
    image: 'image1'
  },
  {
    title: 'Feature 2',
    description: 'Description 2',
    icon: 'icon2',
    image: 'image2'
  },
  {
    title: 'Feature 3',
    description: 'Description 3',
    icon: 'icon3',
    image: 'image3'
  }
]

const Features: FC = () => {
  const [selectedItemIndex, setSelectedItemIndex] = useState(0)
  const handleItemClick = (index: number) => {
    setSelectedItemIndex(index)
  }
  const selectedFeature = items[selectedItemIndex]

  return (
    <Container id="features" sx={{
      py: {
        xs: 8,
        sm: 16 }}}>
      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <div>
            <Typography component="h2" variant="h4" color="text.primary">
              Product features
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{
              mb: {
                xs: 2,
                sm: 4 }}}>
              These are the standard features with Flags.gg
            </Typography>
          </div>
          <Grid container item gap={1} sx={{
            display: {
              xs: 'auto',
              sm: 'none' }}}>
            {items.map(({ title }, index) => (
              <Chip key={index} label={title} onClick={() => handleItemClick(index)} sx={{
                  borderColor: selectedItemIndex === index ? 'primary.light' : '',
                  background: selectedItemIndex === index ? 'none' : '',
                  backgroundColor: selectedItemIndex === index ? 'primary.main' : '',
                  '& .MuiChip-label': {
                    color: selectedItemIndex === index ? '#fff' : '',
                  },
                }}
              />
            ))}
          </Grid>
          <Box component={Card} variant="outlined" sx={{
            display: {
              xs: 'auto',
              sm: 'none'
            },
            mt: 4}}>
            <Box
              sx={{
                backgroundImage: items[selectedItemIndex].image,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: 280,
              }}
            />
            <Box sx={{ px: 2, pb: 2 }}>
              <Typography color="text.primary" variant="body2" fontWeight="bold">
                {selectedFeature.title}
              </Typography>
              <Typography color="text.secondary" variant="body2" sx={{ my: 0.5 }}>
                {selectedFeature.description}
              </Typography>
            </Box>
          </Box>
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="flex-start"
            spacing={2}
            useFlexGap
            sx={{
              width: '100%',
              display: {
                xs: 'none',
                sm: 'flex'
              }}}
          >
            {items.map(({ icon, title, description }, index) => (
              <Card
                key={index}
                variant="outlined"
                component={Button}
                onClick={() => handleItemClick(index)}
                sx={{
                  p: 3,
                  height: 'fit-content',
                  width: '100%',
                  background: 'none',
                  backgroundColor: selectedItemIndex === index ? 'action.selected' : undefined,
                  borderColor: selectedItemIndex === index ? 'primary.dark' : 'grey.800',
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    textAlign: 'left',
                    flexDirection: {
                      xs: 'column',
                      md: 'row'
                    },
                    alignItems: {
                      md: 'center'
                    },
                    gap: 2.5,
                  }}
                >
                  <Box sx={{ color: selectedItemIndex === index ? 'primary.main' : 'grey.700'}}>
                    {icon}
                  </Box>
                  <Box sx={{ textTransform: 'none' }}>
                    <Typography color="text.primary" variant="body2" fontWeight="bold">
                      {title}
                    </Typography>
                    <Typography color="text.secondary" variant="body2" sx={{ my: 0.5 }}>
                      {description}
                    </Typography>
                  </Box>
                </Box>
              </Card>
            ))}
          </Stack>
        </Grid>
        <Grid item xs={12} md={6} sx={{
          display: {
            xs: 'none',
            sm: 'flex'
          },
          width: '100%' }}>
          <Card
            variant="outlined"
            sx={{
              height: '100%',
              width: '100%',
              display: {
                xs: 'none',
                sm: 'flex'
              },
              pointerEvents: 'none',
            }}
          >
            <Box
              sx={{
                m: 'auto',
                width: 420,
                height: 500,
                backgroundSize: 'contain',
                backgroundImage: items[selectedItemIndex].image,
              }}
            />
          </Card>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Features;
