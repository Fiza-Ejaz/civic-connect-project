import React from 'react';
import { Card, CardContent, Typography, TextField, MenuItem, Button, Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useUpdateStatus } from '../../hooks/useComplaints';
import { useSnackbar } from 'notistack';

const WorkerUpdateStatus: React.FC = () => {
	const [status, setStatus] = React.useState('Work Completed');

	const { id } = useParams();
	const { mutateAsync, isPending } = useUpdateStatus();
	const { enqueueSnackbar } = useSnackbar();

	const handleSubmit = async () => {
		if (!id) return;

		await mutateAsync({
			id,
			status: status === 'Work Completed' ? 'Resolved' : 'In Progress'
		});

		enqueueSnackbar('Status updated', { variant: 'success' });
	};

	return (
		<Card>
			<CardContent>
				<Typography variant="h6" gutterBottom>
					Update Work Status
				</Typography>

				<Box sx={{ display: 'grid', gap: 2 }}>
					<TextField
						select
						label="Status"
						value={status}
						onChange={(e) => setStatus(e.target.value)}
					>
						<MenuItem value="Work Started">Work Started</MenuItem>
						<MenuItem value="Work Completed">Work Completed</MenuItem>
					</TextField>

					<Button variant="contained" disabled={isPending} onClick={handleSubmit}>
						Submit
					</Button>
				</Box>
			</CardContent>
		</Card>
	);
};

export default WorkerUpdateStatus;
