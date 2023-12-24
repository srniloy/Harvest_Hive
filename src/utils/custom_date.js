

export const getCurrentDate = () => {
    // Get current date
    const currentDate = new Date();

    // Format the date to 'YYYY-MM-DD' format
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(currentDate.getDate()).padStart(2, '0');

    // Create the formatted date string
    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate
}