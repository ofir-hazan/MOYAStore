import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import StatsBarChart from '../StatsBarChart/StatsBarChart';

function StatisticsDialog(props) {

    const handleClose = () => {
        props.onClose();
    };

    return (
        <Dialog onClose={handleClose} open={props.open}>
            <DialogTitle>The 5 most popular products in MOYA</DialogTitle>
            <StatsBarChart />
        </Dialog>
    )
}

export default StatisticsDialog;