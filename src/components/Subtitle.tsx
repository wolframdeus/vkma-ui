import {styled} from '@material-ui/styles';
import {Theme} from '../lib';

export const Subtitle = styled('div')<Theme>(({theme}) => ({
  fontSize: 16,
  marginBottom: 12,
  color: theme.global.text.colors.secondary,
}));
