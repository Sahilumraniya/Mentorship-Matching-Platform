const getMimeType = (filename: string): string => {
    const ext = filename.split('.').pop()?.toLowerCase(); // Get the file extension
    const mimeTypes: { [key: string]: string } = {
        'jpg': 'image/jpeg',
        'jpeg': 'image/jpeg',
        'png': 'image/png',
        'gif': 'image/gif',
        'pdf': 'application/pdf',
        'txt': 'text/plain',
        'json': 'application/json',
        'html': 'text/html',
        'csv': 'text/csv',
        'zip': 'application/zip',
        'mp4': 'video/mp4',
        'mp3': 'audio/mpeg',
        // Add more types as needed
    };
    return mimeTypes[ext as string] || 'application/octet-stream'; // Default to binary stream if not found
};

export default getMimeType;