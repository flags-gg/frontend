import {FC} from "react";
import {Box, Typography} from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

interface ItemProps {
  itemText: string
  subtitle?: string
  itemNumber?: number
  skipNumber?: boolean
  extraInfo?: string
}

const formatNumber = (num: number) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k';
  }
  return num.toString();
}

export const Item: FC<ItemProps> = ({itemText,  subtitle, itemNumber, skipNumber, extraInfo }) => {
  return (
    <Box sx={{py: 1, display: 'flex', gap: 1.5, alignItems: 'center'}} key={itemText + extraInfo}>
      <CheckCircleRoundedIcon sx={{width: 20, color: subtitle === undefined ? 'primary.main' : 'primary.light'}} />
      <Typography component="span" variant="subtitle2" sx={{ color: subtitle === undefined ? subtitle : 'grey.200', textTransform: 'capitalize'}}>
        {skipNumber ? '' : itemNumber === undefined ? "Unlimited" : formatNumber(itemNumber)} {itemText} {extraInfo}
      </Typography>
    </Box>
  )
}
