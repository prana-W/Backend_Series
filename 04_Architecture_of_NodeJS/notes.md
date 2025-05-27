# ATTENTION
- [Video Link](https://www.youtube.com/watch?v=y0aTs56DJWk)
- Kindly [watch](https://www.youtube.com/watch?v=_eJ6KAb56Gw) for a detailed explanation on the architecture of NodeJS.

# Short-Notes

- There is a client that sends a request to the server (here NodeJS) and the server sends a response back to the client. 
- The response is first stored in an event queue
- The event loop checks the event queue and if there is an event, it processes it.
- If the task is asynchronous (non-blocking), it is processed immediately by the event loop.
- If the task is synchronous (blocking), it is processed by the thread pool.
- The thread pool is a set of threads that are used to process blocking tasks.
- If thread/workers are available, the task is processed by a thread  else it waits till a thread is available.
- By default,  Node.js has 4 threads in the thread pool, which can be increase.
- Hence, we should try to avoid blocking tasks in Node.js, to reduce wait time. 

Default Pool size = 4
Maximum Pool size = Depends on server (Total cores in CPU)

