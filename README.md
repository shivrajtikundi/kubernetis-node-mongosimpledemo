# kubernetis-node-mongosimpledemo
I was previously using a MongoDB deployment YAML file which consists of this code and encountered an error. This code didn't work for me; I kept getting authentication failed.

   spec:
      containers:
      - name: mongo
        image: mongo:latest
        command:
            - "numactl"
            - "--interleave=all"
            - "mongod"
            - "--wiredTigerCacheSizeGB"
            - "0.30"
            - "--bind_ip"
            - "0.0.0.0"
        ports:
        - containerPort: 27017
          hostPort: 27017
        env:
          - name: MONGO_INITDB_USERNAME
            valueFrom:
            
![Screenshot from 2024-04-11 00-16-52](https://github.com/shivrajtikundi/kubernetis-node-mongosimpledemo/assets/90643895/4ccbf57d-e341-4750-bce4-a5c96bc16b03)

if you get auth error try changing mongo deplyoment.

    
