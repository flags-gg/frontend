import {FC} from "react";
import {Box, Card, CardContent, Chip, Container, Divider, Grid, Typography} from "@mui/material";
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import {useFlags} from "@flags-gg/react-library";

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
      '10 Team Members',
      '1 Project',
      '1 Agent per Project',
      '2 Environment per Agent',
      '50,000 Requests per Environment a month',
      'Community Support',
    ]
  },
  {
    title: 'Startup',
    subheader: 'Most popular',
    price: 15,
    features: [
      '20 Team Members',
      '5 Projects',
      '2 Agents per Project',
      '2 Environment per Agent',
      '1,000,000 Requests per Environment a month',
      'A/B traffic based testing',
    ]
  },
  {
    title: 'Pro',
    price: 50,
    features: [
      '50 Team Members',
      '10 Projects',
      '2 Agents per Project',
      '3 Environment per Agent',
      '5,000,000 Requests per Environment a month',
      'Extended support',
    ]
  },
  {
    title: 'Enterprise',
    price: 200,
    features: [
      'Unlimited Team Members',
      'Unlimited Projects',
      '5 Agents per Project',
      '5 Environment per Agent',
      '20,000,000 Requests per Environment a month',
      'Priority Support',
    ]
  }
]

const Pricing: FC = () => {
  const {is} = useFlags();
  if (!is('pricing').enabled()) {
    return null;
  }

  return (
    <Container
      id="pricing"
      maxWidth={false}
      sx={{
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
          <Grid item key={tier.title} xs={12} sm={tier.title === 'Enterprise' ? 12 : 6} md={3}>
            <Card sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
                border: tier.subheader === undefined ? tier.subheader : '1px solid',
                borderColor: tier.subheader === undefined ? tier.subheader : 'primary.main',
                background: tier.subheader === undefined ? tier.subheader : 'linear-gradient(#033363, #021F3B)',
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
                  {tier.subheader !== undefined && (
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
                    color: tier.subheader === undefined ? tier.subheader : 'grey.50',
                  }}>
                  <Typography component="h4" variant="h2">
                    ${tier.price}
                  </Typography>
                  <Typography component="h4" variant="h6">
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
                        color: tier.subheader === undefined ? 'primary.main' : 'primary.light',
                      }} />
                    <Typography component="span"
                      variant="subtitle2" sx={{
                        color: tier.subheader === undefined ? tier.subheader : 'grey.200',
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
