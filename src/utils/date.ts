export const formatDate = (dateText: string) => {
	const date = new Date(dateText);
	const formattedDate = new Intl.DateTimeFormat('sv-SE', {
		dateStyle: 'short',
	}).format(date);

	return formattedDate
}