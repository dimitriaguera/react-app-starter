/**
 * Created by Dimitri Aguera on 30/09/2017.
 */
const fs = require('fs');
const path = require('path');
const config = require(path.resolve('./config/env/config'));
const readChunk = require('read-chunk');
const fileType = require('file-type');

exports.read = function (req, res) {

    // Build absolute path.
    const drive = config.folder_base_url;
    const query = req.query.path;
    const filePath = `${drive}/${query}`;

    // Get buffer to extract MIME from checking magic number of the buffer.
    const buffer = readChunk.sync(filePath, 0, 4100);
    const ft = fileType( buffer );

    // Get stat file.
    const stat = fs.statSync(filePath);

    // Create response Header.
    res.writeHead(200, {
        'Content-Type': ft.mime,
        'Content-Length': stat.size
    });

    // Create Readable.
    const audio = fs.createReadStream(filePath);

    // Pipe data in server response.
    audio.pipe(res, { end: false });

    res.on('close', () => {
        console.log('CLOSE RESP');
    });

    // Handle error event during stream.
    audio.on( 'error', ( err ) => {
        console.log( err.message );
        res.end('Goodbye');
    });

    // Handle close event.
    audio.on('close', () => {
        console.log('CLOSE EVENT');
        res.end('Goodbye');
    });

    // Handle end event.
    audio.on('end', () => {
        console.log('END EVENT');
        res.end('Goodbye');
    });
};
