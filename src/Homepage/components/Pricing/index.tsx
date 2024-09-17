import {FC, useEffect, useState} from "react";
import {Box, Card, CardContent, Chip, Container, Divider, Grid, Typography} from "@mui/material";
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import {useFlags} from "@flags-gg/react-library";
import {Item} from "@HC/Pricing/Item.tsx";

interface Extra {
  title: string;
  launched: boolean;
}
interface Price {
  title: string;
  sub_title?: string;
  price: number;
  team_members?: number;
  projects?: number;
  agents: number;
  environments: number;
  requests: number;
  support_type: string;
  extras?: Extra[];
}

const Pricing: FC = () => {
  const {is} = useFlags();
  const [prices, setPrices] = useState<Price[]>([]);

  const getPricing = async () => {
    const response = await fetch(`https://api.flags.gg/v1/pricing`);
    const data = await response.json();
    return data;
  }

  useEffect(() => {
    getPricing().then((data) => {
      setPrices(data.prices);
    });
  }, []);

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
        {prices.map((tier) => (
          <Grid item key={tier.title} xs={12} sm={tier.title === 'Enterprise' ? 12 : 6} md={3}>
            <Card sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
                border: tier.sub_title === undefined ? tier.sub_title : '1px solid',
                borderColor: tier.sub_title === undefined ? tier.sub_title : 'primary.main',
                background: tier.sub_title === undefined ? tier.sub_title : 'linear-gradient(#033363, #021F3B)',
              }}>
              <CardContent>
                <Box sx={{
                    mb: 1,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    color: tier.title === 'Pro' ? 'grey.100' : '',
                  }}>
                  <Typography component="h3" variant="h6" sx={{textTransform: 'capitalize'}}>
                    {tier.title}
                  </Typography>
                  {tier.sub_title !== undefined && (
                    <Chip icon={<AutoAwesomeIcon />} label={tier.sub_title} size="small" sx={{
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
                    color: tier.sub_title === undefined ? tier.sub_title : 'grey.50',
                  }}>
                  <Typography component="h4" variant="h2">
                    ${tier.price === undefined ? '0' : tier.price}
                  </Typography>
                  <Typography component="h4" variant="h6">
                    &nbsp; per month
                  </Typography>
                </Box>
                <Divider sx={{my: 2, opacity: 0.2, borderColor: 'grey.500'}} />
                <Item itemText={"Team Members"} itemNumber={tier.team_members} />
                <Item itemText={"Projects"} itemNumber={tier.projects} />
                <Item itemText={"Agents per Project"} itemNumber={tier.agents} />
                <Item itemText={"Environment per Agent"} itemNumber={tier.environments} />
                <Item itemText={"Requests per Environment"} itemNumber={tier.requests} />
                <Item itemText={`${tier.support_type} Support`} skipNumber={true} />

                {tier.extras?.map((extra) => (
                  <Item
                    itemText={extra.title}
                    skipNumber={true}
                    extraInfo={extra.launched ? undefined : '(Coming Soon)'}
                    subtitle={extra.launched ? undefined : "true"} />
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
