const getSecurityCamVideo = (req, res) => {
    const {frame} = req.body; 
	res.writeHead(200, {'Content-Type': 'multipart/x-mixed-replace; boundary=frame'});
    res.end();
}

module.exports = {getSecurityCamVideo}