# How to run
Step 1: Run Solr and create a Core named `csp`

Step 2: Configure Solr

- Open solr/index.js
- Configure Solr
    ```
    const client = new SolrNode({
        host: '127.0.0.1',
        port: '8983',
        core: 'csp', // give the correct core name here
        protocol: 'http'
    });
    ```

Step 3: Create Index file out of AWS Service

```
> cd solr/aws/
> node index.js // this would create index.json file for all aws service with pricing
```

Index the above data to Solr

```
> cd solr
> node index.js
```