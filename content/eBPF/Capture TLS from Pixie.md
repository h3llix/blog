
## Current Approach  (Considering given time and scope) 

- Considering the scope and time of the assignment I went on to support Openssl **1.1.0** and **1.1.1**
- During `SSL_read` and `SSL_write` we have `SSL*`, if we look at the SSL struct [here]( https://github.com/openssl/openssl/blob/OpenSSL_1_1_1/ssl/ssl_locl.h#L1076) .Version is at 0 offset from `SSL*` 

I observed that `version` holds the TLS protocol in transaction. Verified this on 
-  OpenSSL 1.1.0
-  OpenSSL 1.1.1

###  Verify `version` holds the TLS version
 - Write SSL server and print TLS version on the userspace side
 - Write a small `BPFTrace` program to read first 4 bytes from the `SSL*` and following it the output. 
```uprobe:/home/h3llix/openssl_local/lib/libssl.so.1.1:SSL_read, uprobe:/home/h3llix/openssl_local/lib/libssl.so.1.1:SSL_write  
{  
    printf("PID: %d, SSL*: %p\n", pid, arg0);  
    @tls_versions[pid] = *(int32 *)arg0;  // Read first 4 bytes from SSL pointer  
}  
  
uretprobe:/home/h3llix/openssl_local/lib/libssl.so.1.1:SSL_read, uretprobe:/home/h3llix/openssl_local/lib/libssl.so.1.1:SSL_write  
{  
    if (@tls_versions[pid]) {  
        printf("TLS Version: 0x%x\n", @tls_versions[pid]);  
        delete(@tls_versions[pid]);  
    }  
}
```
![[Pasted image 20250217201500.png]]


Note: However OpenSSL 3 and Boring SSL have different offset. 

## How to calculate offset for other libs. 
- Compiled Openssl from source
- Write a small server and linked it with compiled openssl. 
- Now to calculate offset using some debugger.
- We can definitely  use `GDB` but followed a IDE debuger way to calculate offset and verified current offset.

![[Pasted image 20250217201321.png]]
- Pixie already has a way to send offset to kernel space using a bpf map https://github.com/pixie-io/pixie/blob/9b05b625f224dbd25af69d1a40f7e43de5483ee1/src/stirling/source_connectors/socket_tracer/bcc_bpf_intf/symaddrs.h#L259. We can leverage this to support other libs.

Extended current code to capture version from `SSL_read` and `SSL_write` and extend the http events data table.as well as pxl script to show now columns based on TLS version.
https://github.com/h3llix/pixie/pull/1

## Approach 2 (Better Approach)

Instead of maintaining offset, we can call `infer_protocol` on the client handshake and server handshake and directly infer protocol version there. We use this approach at Traceable. Pixie is also using this to add support for TLS_events here. https://github.com/pixie-io/pixie/pull/2096/files#diff-7c442030ed958995f447d6129b4cfb3e5cb82fa27cbb585c419864b53e361539R79 and update the conn_tracker to capture TLS handshake as well as internal protocol. This can then be passed to HTTP connection tracker.

Pixie is already working on it and it being tracked here:
https://github.com/pixie-io/pixie/issues/2095
https://github.com/pixie-io/pixie/pull/2050
https://github.com/pixie-io/pixie/pull/2058





