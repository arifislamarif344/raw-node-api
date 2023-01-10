/*
 * Title: Data Storage
 * Description: Data Store in local device
 * Author: MD Arif Islam
 * Date: 12 Nov 2022
 */

// dependencies
const { dir } = require("console");
const fs = require("fs");
const path = require("path");

// lib object - module scaffolding
const lib = {};

// base directory of data folder
lib.basedir = path.join(__dirname, "/../.data/");

// write data to file
lib.create = (dir, file, data, callback) => {
  // open file for writting
  fs.open(
    lib.basedir + dir + "/" + file + ".json",
    "wx",
    (err, fileDescriptor) => {
      if (!err && fileDescriptor) {
        // convert data to string
        const stringData = JSON.stringify(data);

        // write data to file and then close it
        fs.writeFile(fileDescriptor, stringData, (err) => {
          if (!err) {
            fs.close(fileDescriptor, (err) => {
              if (!err) {
                callback(false);
              } else {
                callback("Error closing the new file!");
              }
            });
          } else {
            callback("Error writting to new file");
          }
        });
      } else {
        callback("Couldn't create new file, it may already exists!");
      }
    }
  );
};

//read data from file
lib.read = (dir, file, callback) => {
  fs.readFile(
    `${lib.basedir + dir + "/" + file + ".json"}`,
    "utf-8",
    (err, data) => {
      callback(err, data);
    }
  );
};

// update existing file
lib.update = (dir, file, data, callback) => {
  // file open for writing
  fs.open(`${lib.basedir + dir}/${file}.json`, "r+", (err, fileDescriptor) => {
    if (!err && fileDescriptor) {
      // convert the data to string
      const stringData = JSON.stringify(data);

      // truncate the file
      fs.ftruncate(fileDescriptor, (err1) => {
        if (!err1) {
          // write to the file and close it
          fs.writeFile(fileDescriptor, stringData, (err2) => {
            if (!err2) {
              // close the file
              fs.close(fileDescriptor, (err3) => {
                if (!err3) {
                  callback(false);
                } else {
                  callback("Error closing file!");
                }
              });
            } else {
              callback("Error writing to file!");
            }
          });
        } else {
          callback("Error truncating file!");
        }
      });
    } else {
      console.log(`Error updating. File may not exist`);
    }
  });
};

// delete existing file
lib.delete = (dir, file, callback) => {
  // unlink file
  fs.unlink(`${lib.basedir + dir}/${file}.json`, (err) => {
    if (!err) {
      callback(false);
    } else {
      callback(`Error deleting file`);
    }
  });
};

module.exports = lib;
