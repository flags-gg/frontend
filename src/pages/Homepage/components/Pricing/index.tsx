import {FC} from "react";
import {Box, Card, CardContent, Chip, Container, Divider, Grid, Typography} from "@mui/material";
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';

interface Tiers {
  title: string;
  price: number;
  subheader?: string;
  features: string[];
}

const tiers: Tiers[] = [
  {
    title: 'Free',
    price: 0,
    features: [
      '10 Users',
      '3 Projects',
      '20,000 Requests a month',
      'Community Support',
    ]
  },
  {
    title: 'Pro',
    subheader: 'Most popular',
    price: 15,
    features: [
      '50 users',
      '10 projects',
      '50,000 Requests a month',
      'Priority support',
    ]
  },
  {
    title: 'Enterprise',
    price: 30,
    features: [
      'Unlimited users',
      'Unlimited projects',
      'Unlimited Requests a month',
      'Dedicated Server Resources',
    ]
  }
]

const Pricing: FC = () => {
  return (
    <Container id="pricing" sx={{
        pt: {
          xs: 4,
          sm: 12
        },
        pb: {
          xs: 8,
          sm: 16
        },
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: {
          xs: 3,
          sm: 6
        },
      }}>
      <Box sx={{
          width: {
            sm: '100%',
            md: '60%'
          },
          textAlign: {
            sm: 'left',
            md: 'center'
          },
        }}>
        <Typography component="h2" variant="h4" color="text.primary">
          Pricing
        </Typography>
      </Box>
      <Grid container spacing={3} alignItems="center" justifyContent="center">
        {tiers.map((tier) => (
          <Grid item key={tier.title} xs={12} sm={tier.title === 'Enterprise' ? 12 : 6} md={4}>
            <Card sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
                border: tier.title === 'Pro' ? '1px solid' : undefined,
                borderColor: tier.title === 'Pro' ? 'primary.main' : undefined,
                background: tier.title === 'Pro' ? 'linear-gradient(#033363, #021F3B)' : undefined,
              }}>
              <CardContent>
                <Box sx={{
                    mb: 1,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    color: tier.title === 'Pro' ? 'grey.100' : '',
                  }}>
                  <Typography component="h3" variant="h6">
                    {tier.title}
                  </Typography>
                  {tier.title === 'Pro' && (
                    <Chip icon={<AutoAwesomeIcon />} label={tier.subheader} size="small" sx={{
                        background: 'none',
                        backgroundColor: 'primary.contrastText',
                        '& .MuiChip-label': {
                          color: 'primary.dark',
                        },
                        '& .MuiChip-icon': {
                          color: 'primary.dark',
                        },
                      }} />
                  )}
                </Box>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'baseline',
                    color: tier.title === 'Pro' ? 'grey.50' : undefined,
                  }}>
                  <Typography component="h3" variant="h2">
                    ${tier.price}
                  </Typography>
                  <Typography component="h3" variant="h6">
                    &nbsp; per month
                  </Typography>
                </Box>
                <Divider sx={{
                    my: 2,
                    opacity: 0.2,
                    borderColor: 'grey.500',
                  }} />
                {tier.features.map((line) => (
                  <Box key={line} sx={{
                      py: 1,
                      display: 'flex',
                      gap: 1.5,
                      alignItems: 'center',
                    }}>
                    <CheckCircleRoundedIcon sx={{
                        width: 20,
                        color: tier.title === 'Pro' ? 'primary.light' : 'primary.main',
                      }} />
                    <Typography component="text"
                      variant="subtitle2" sx={{
                        color: tier.title === 'Pro' ? 'grey.200' : undefined,
                      }}>
                      {line}
                    </Typography>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Pricing
