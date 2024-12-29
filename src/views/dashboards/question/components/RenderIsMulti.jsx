import { Tooltip } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import NotInterestedIcon from '@mui/icons-material/NotInterested';

const RenderIsMulti = ({ checked }) => {
    return (
        <Tooltip title={checked ? 'Multiple Answers Allowed' : 'Single Answer Only'}>
            {checked ? <CheckIcon /> : ''}
        </Tooltip>
    );
};

export default RenderIsMulti;