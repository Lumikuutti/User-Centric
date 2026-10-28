console.log('Hello Node.js!');
import {items} from './items';
import express from 'express';
import http from 'http';

const hostname = '127.0.0.1';
const app = express();
const port = 3000;

app.set('view engine', 'pug');
app.set('views', 'src/views');

app.use(express.static('public'));

//not found function for when trying to reach a non-existent page
const notFound = (response) => {
  response.writeHead(404, {'Content-Type': 'text/html'});
  response.end('<h1>404 - Not Found</h1>');
};

const server = http.createServer((req, res) => {
  console.log('Request', req.method, req.url);
  // splitting request url to resource name and resource id
  const [, resource, id] = req.url.split('/');

  // GET root
  if (req.url === '/') {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('<p>Welcome to the example API</p>');
    // GET /items
  } else if (req.method === 'GET' && resource === 'items') {
    if (id) {
      const item = items.find((item) => id == item.id);
      if (!item) {
        notFound(res);
        return;
      }
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.write(JSON.stringify(item));
    } else {
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.write(JSON.stringify(items));
    }
    res.end();
    // POST /items
  } else if (req.method === 'POST' && resource === 'items') {
    let data = '';
    req.on('data', (chunk) => {
      data += chunk.toString();
    });
    req.on('end', () => {
      console.log('POST data:', data);
      // Try to create a new object based on posted json data
      try {
        const newItem = JSON.parse(data);
        newItem.id = items[items.length - 1].id + 1;
        items.push(newItem);
        res.writeHead(201, {'Content-Type': 'application/json'});
        res.end('{"message": "Data received", "data": ' + data + '}');
      } catch {
        // Complain about bad request if it fails
        res.writeHead(400, {'Content-Type': 'application/json'});
        res.end('{"message": "Bad Request"}');
      }
    });
  } else if (req.method === 'DELETE' && resource === 'items') {
    if (id) {
      const item = items.find((item) => id == item.id);
      if (!item) {
        //no item with that id found, ergo, No Content
        res.writeHead(204, {'Content-Type': 'application/json'});
        res.end('{"message": "No Content"}');
        return;
      }
      const index = items.findIndex((item) => id == item.id);
      //Delete the desired item from the array
      items.splice(index, 1);
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end('{"message": "Item Deleted"}');
    } else {
      notFound(res);
    }
  } else if (req.method === 'PUT' && resource === 'items') {
    if (id) {
      const item = items.find((item) => id == item.id);
      if (!item) {
        // Complain about bad request if it fails
        res.writeHead(400, {'Content-Type': 'application/json'});
        res.end('{"message": "Bad Request"}');
        return;
      }
      let data = '';
      req.on('data', (chunk) => {
        data += chunk.toString();
      });
      req.on('end', () => {
        try {
          console.log('PUT data:', data);
          const modifiedItem = JSON.parse(data);
          if (!modifiedItem.name) {
            throw new Error('Bad Request');
          }
          item.name = modifiedItem.name;
          res.writeHead(200, {'Content-Type': 'application/json'});
          res.write(JSON.stringify(modifiedItem));
          res.end('{"message": "Data modified", "data":' + data + '}');
        } catch {
          // Complain about bad request if it fails
          res.writeHead(400, {'Content-Type': 'application/json'});
          res.end('{"message": "Bad Request"}');
        }
      });
    } else {
      notFound(res);
    }
  }

  // Default 404 error responsse
  else {
    notFound(res);
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
