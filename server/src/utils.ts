import fs from "fs";

const _rollingUpdate = () => {
    console.log("Rolling updates");
    // Reads all data points, remove oldest one
}

const _readFileData = async () => {
    fs.readFile('./data/data.json', function(err, data) {
        if (err) throw err;
        else {
            return JSON.parse(data.toString());
        }
    });
}

const _writeFileData = async (toWriteData: Object) => {
    fs.writeFile('./data/data_tmp.json', JSON.stringify(toWriteData), (err) => {
        if (err) throw err;
        fs.rename('./data/data_tmp.json', './data/data.json', () => {
            if (err) throw err;
            console.log("Successfully moved file")
        });
    });
}

async function putToFile(incomingData: any){
    // Before we start, check and see how many points we have
    // if more than > 20 data points, delete the oldest one
    _rollingUpdate();
}

export {putToFile};