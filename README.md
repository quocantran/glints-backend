# BÀI TẬP LỚN: LẬP TRÌNH MẠNG

## [Tên dự án của nhóm]

> 📘 _Mẫu README này là khung hướng dẫn. Sinh viên chỉ cần điền thông tin của nhóm và nội dung dự án theo từng mục._

---

## 🧑‍💻 THÔNG TIN NHÓM

| STT | Họ và Tên       | MSSV       | Email                     | Đóng góp |
| --- | --------------- | ---------- | ------------------------- | -------- |
| 1   | Trần Quốc An    | B22DCCN007 | quocan142536@gmail.com    | 40%      |
| 2   | Phùng Đức Bách  | B22DCCN055 | backchill17@gmail.com     | 30%      |
| 3   | Hoàng Xuân Bách | B22DCCN054 | bachhxf8@fullstack.edu.vn | 30%      |

**Tên nhóm:** 007054055
**Chủ đề đã đăng ký:** (Website làm bài tập lập trình mạng)

---

## 🧠 MÔ TẢ HỆ THỐNG

> Mô tả tổng quan hệ thống mà nhóm triển khai.

> Hệ thống gồm một **frontend** (Next.js) và một **backend** (Java Spring Boot + Netty Socket.IO). Frontend giao tiếp với backend bằng hai kênh chính:
>
> - HTTP (REST API) dùng `fetch` để lấy dữ liệu, danh sách đề, đăng nhập, đăng ký, xem lịch sử nộp, nhắn tin, xem bảng xếp hạng, nộp mã nguồn; REST API chạy trên cổng `8888`.
> - WebSocket (Socket.IO) dùng để chat realtime và nhận thông báo kết quả chấm bài; Socket.IO (Netty) chạy trên cổng `8889`.
> - Hệ thống bao gồm các server chuyên biệt để chấm các dạng bài yêu cầu tương tác mạng hoặc xử lý input/output đặc thù:
> - TCP Buffered: port `2206`
> - TCP DataInputStream: port `2207`
> - TCP InputStream: port `2208`
> - UDP: port `2209`
> - RMI: port `1099`

> Ngoài ra hệ thống hỗ trợ chat realtime qua Socket.IO với hai chế độ:
>
> - **Chat toàn hệ thống**: mọi người dùng đang kết nối sẽ nhận được tin nhắn công khai. Dùng cho thông báo chung, thảo luận chung.
> - **Chat riêng tư 1:1**: hai người dùng có thể trao đổi riêng bằng cách gửi tin nhắn tới user khác (sử dụng room riêng cho cặp người dùng).

**Cấu trúc logic tổng quát:**

```
client  <-->  server  <-->  database
```

**Sơ đồ hệ thống:**

![System Diagram](./statics/diagram.png)

---

## ⚙️ CÔNG NGHỆ SỬ DỤNG

> Liệt kê công nghệ, framework, thư viện chính mà nhóm sử dụng.

| Thành phần | Công nghệ                                                                         | Ghi chú                                           |
| ---------- | --------------------------------------------------------------------------------- | ------------------------------------------------- |
| Server     | Java 17 + Spring Boot(Web, Security, WebSocket, JPA, Validation) + Netty-SocketIO | REST API, WebSocket(qua socket.io), tcp, udp ,rmi |
| Client     | Nodejs 20 + Next.js + React + Ant Design + Redux Toolkit + Socket.IO Client       | Giao tiếp HTTP, WebSocket (qua socket.io)         |
| Database   | MySQL                                                                             | Lưu trữ dữ liệu tạm thời                          |

---

## 🚀 HƯỚNG DẪN CHẠY DỰ ÁN

### 1. Clone repository

```bash
git clone https://github.com/jnp2018/mid-project-007054055.git
cd mid-project-007054055
```

### 2. Chạy server

```bash
cd source/server
mvn clean install
mvn spring-boot:run
# Các lệnh để khởi động server
```

### 3. Chạy client

```bash
cd source/client
npm install
npm run dev
# Các lệnh để khởi động client
```

### 4. Kiểm thử nhanh

```bash
# Các lệnh test
curl http://localhost:8888/health
curl http://localhost:3000
```

---

## 🔗 GIAO TIẾP (GIAO THỨC SỬ DỤNG)

| Endpoint                                | Protocol | Method | Input   | Output                                                                                |
| --------------------------------------- | -------- | ------ | ------- | ------------------------------------------------------------------------------------- |
| `/health`                               | HTTP/1.1 | GET    | —       | `{ "message": "success", "status": 200, "data": { "message": "OK" }, "error": null }` |
| `/auth/login`                           | HTTP/1.1 | POST   | `{ "email": "bachpd@gmail.com", "password": "123456" }` | `{ "message": "success", "status": 200, "data": { "user": { "id": 3, "name": "Phùng Đức Bách", "email": "bachpd@gmail.com", "studentId": "B22DCCN055", "role": "STUDENT" }, "access_token": "<JWT_TOKEN>" }, "error": null }` |
| `/auth/register`                        | HTTP/1.1 | POST   | `{ "email": "test@gmail.com", "name": "test", "password": "123456", "studentId": "abc112233" }` | `{ "message": "success", "status": 200, "data": { "name": "test", "email": "test@gmail.com", "password": "123456", "studentId": "abc112233" }, "error": null }` |
| `/auth/account`                         | HTTP/1.1 | GET    | —       | `{ "message": "success", "status": 200, "data": { "user": { "id": 3, "name": "Phùng Đức Bách", "email": "bachpd@gmail.com", "studentId": "B22DCCN055", "role": "STUDENT" } }, "error": null }` |
| `/auth/refresh`                         | HTTP/1.1 | GET    | —       | `{ "message": "success", "status": 200, "data": { "user": { "id": 3, "name": "Phùng Đức Bách", "email": "bachpd@gmail.com", "studentId": "B22DCCN055", "role": "STUDENT" }, "access_token": "<JWT_TOKEN>" }, "error": null }` |
| `/auth/logout`                          | HTTP/1.1 | POST   | —       | `{ "message": "success", "status": 200, "data": null, "error": null }` |
| `/chats`                                | HTTP/1.1 | POST   | `{ "content": "string", "roomId": null }` | `{ "message": "success", "status": 201, "data": { "id": null, "content": "string", "createdAt": "2025-11-16T13:22:59.055927900Z", "updatedAt": "2025-11-16T13:22:59.055927900Z", "user": { "id": 3, "name": "Phùng Đức Bách", "email": "bachpd@gmail.com", "studentId": "B22DCCN055", "role": "STUDENT" } }, "error": null }` |
| `/chats`                                | HTTP/1.1 | GET    | `{"page": 1, "size" : 2}`     | `{ "message": "success", "status": 200, "data": { "meta": { "current": 1, "pageSize": 2, "pages": 31, "total": 61 }, "result": [ { "id": 1, "content": "db", "createdAt": "2025-11-10T15:25:22.035179Z", "updatedAt": "2025-11-10T15:25:22.035179Z", "user": { "id": 6, "name": "Đào Đức Duy", "email": "duydd@gmail.com", "studentId": "B22DCCN0145", "role": "STUDENT" } }, { "id": 2, "content": "b", "createdAt": "2025-11-10T15:25:28.242107Z", "updatedAt": "2025-11-10T15:25:28.242107Z", "user": { "id": 6, "name": "Đào Đức Duy", "email": "duydd@gmail.com", "studentId": "B22DCCN0145", "role": "STUDENT" } } ] }, "error": null }` |
| `/chats/rooms`                          | HTTP/1.1 | GET    | `{"page": 1, "size": 2, "roomId": 13}` | `{ "message": "success", "status": 200, "data": { "meta": { "current": 1, "pageSize": 2, "pages": 6, "total": 12 }, "result": [ { "id": 7, "content": "hello", "createdAt": "2025-11-11T15:45:06.391707Z", "updatedAt": "2025-11-11T15:45:06.391707Z", "user": { "id": 6, "name": "Đào Đức Duy", "email": "duydd@gmail.com", "studentId": "B22DCCN0145", "role": "STUDENT" } }, { "id": 145, "content": ":))))))))", "createdAt": "2025-11-11T16:59:35.409573Z", "updatedAt": "2025-11-11T16:59:35.409573Z", "user": { "id": 6, "name": "Đào Đức Duy", "email": "duydd@gmail.com", "studentId": "B22DCCN0145", "role": "STUDENT" } } ] }, "error": null }` |
| `/chats/{id}`                           | HTTP/1.1 | DELETE | `{"id": 269}` | `{ "message": "success", "status": 200, "data": { "id": 269, "content": "string", "createdAt": "2025-11-16T13:22:59.057931Z", "updatedAt": "2025-11-16T13:22:59.057931Z", "user": { "id": 3, "name": "Phùng Đức Bách", "email": "bachpd@gmail.com", "studentId": "B22DCCN055", "role": "STUDENT" } }, "error": null }` |
| `/problems`                             | HTTP/1.1 | GET    | `{"page": 1, "size": 2}` | `{ "message": "success", "status": 200, "data": { "meta": { "current": 1, "pageSize": 2, "pages": 5, "total": 10 }, "result": [ { "id": 1, "title": "Loại bỏ ký tự đặc biệt, trùng và giữ nguyên thứ tự xuất hiện", "description": "Một chương trình server cho phép kết nối qua giao thức TCP tại cổng 2206\n(hỗ trợ thời gian giao tiếp tối đa cho mỗi yêu cầu là 5s).\n\nYêu cầu là xây dựng một chương trình client tương tác tới server sử dụng các luồng ký tự (BufferedReader/BufferedWriter) theo kịch bản dưới đây:\n\na. Gửi một chuỗi gồm mã sinh viên và mã câu hỏi theo định dạng \"studentCode;qCode\". Ví dụ: \"B15DCCN999;7D6265E3\"\n\nb. Nhận một chuỗi ngẫu nhiên từ server\n\nc. Loại bỏ ký tự đặc biệt, số, ký tự trùng và giữ nguyên thứ tự xuất hiện của ký tự. Gửi chuỗi đã được xử lý lên server.\n\nd. Đóng kết nối và kết thúc chương trình", "protocolType": "tcp", "type": "tcp-char", "ioType": "BUFFER", "solved": true, "qcode": "xVX7k3lq" }, { "id": 2, "title": "Giải mã Caesar (dịch chuyển ký tự)", "description": "Mật mã caesar, còn gọi là mật mã dịch chuyển, để giải mã thì mỗi ký tự nhận được sẽ được thay thế bằng một ký tự cách nó một đoạn s. \nVí dụ: với s = 3 thì ký tự “A” sẽ được thay thế bằng ký tự “D”.\nMột chương trình server cho phép kết nối qua giao thức TCP tại cổng 2207 (hỗ trợ thời gian giao tiếp tối đa cho mỗi yêu cầu là 5s). \nYêu cầu là xây dựng chương trình client tương tác với server trên, sử dụng các luồng byte (DataInputStream/DataOutputStream) để trao đổi thông tin theo thứ tự:\na. Gửi một chuỗi gồm mã sinh viên và mã câu hỏi theo định dạng \"studentCode;qCode\". Ví dụ: \"B15DCCN999;D68C93F7\"\nb. Nhận lần lượt chuỗi đã bị mã hóa caesar và giá trị dịch chuyển s nguyên\nc. Thực hiện giải mã ra thông điệp ban đầu và gửi lên Server\nd. Đóng kết nối và kết thúc chương trình.", "protocolType": "tcp", "type": "tcp-byte", "ioType": "DATA", "solved": true, "qcode": "x77snUdo" } ] }, "error": null }` |
| `/problems/get-one/{qCode}`             | HTTP/1.1 | GET    | `{"qCode": "x77snUdo"}` | `{ "message": "success", "status": 200, "data": { "id": 2, "title": "Giải mã Caesar (dịch chuyển ký tự)", "description": "Mật mã caesar, còn gọi là mật mã dịch chuyển, để giải mã thì mỗi ký tự nhận được sẽ được thay thế bằng một ký tự cách nó một đoạn s. \nVí dụ: với s = 3 thì ký tự “A” sẽ được thay thế bằng ký tự “D”.\nMột chương trình server cho phép kết nối qua giao thức TCP tại cổng 2207 (hỗ trợ thời gian giao tiếp tối đa cho mỗi yêu cầu là 5s). \nYêu cầu là xây dựng chương trình client tương tác với server trên, sử dụng các luồng byte (DataInputStream/DataOutputStream) để trao đổi thông tin theo thứ tự:\na. Gửi một chuỗi gồm mã sinh viên và mã câu hỏi theo định dạng \"studentCode;qCode\". Ví dụ: \"B15DCCN999;D68C93F7\"\nb. Nhận lần lượt chuỗi đã bị mã hóa caesar và giá trị dịch chuyển s nguyên\nc. Thực hiện giải mã ra thông điệp ban đầu và gửi lên Server\nd. Đóng kết nối và kết thúc chương trình.", "protocolType": "tcp", "type": "tcp-byte", "ioType": "DATA", "solved": false, "qcode": "x77snUdo" }, "error": null }` |
| `/rooms/me`                             | HTTP/1.1 | GET    | —       | `{ "message": "success", "status": 200, "data": [ { "id": 13, "name": "private_3_6", "participants": [ { "id": 6, "name": "Đào Đức Duy", "email": "duydd@gmail.com", "studentId": "B22DCCN0145", "role": "STUDENT" }, { "id": 3, "name": "Phùng Đức Bách", "email": "bachpd@gmail.com", "studentId": "B22DCCN055", "role": "STUDENT" } ] }, { "id": 16, "name": "private_2_3", "participants": [ { "id": 2, "name": "Trần Quốc An", "email": "antq@gmail.com", "studentId": "B22DCCN007", "role": "STUDENT" }, { "id": 3, "name": "Phùng Đức Bách", "email": "bachpd@gmail.com", "studentId": "B22DCCN055", "role": "STUDENT" } ] }, { "id": 18, "name": "private_3_5", "participants": [ { "id": 3, "name": "Phùng Đức Bách", "email": "bachpd@gmail.com", "studentId": "B22DCCN055", "role": "STUDENT" }, { "id": 5, "name": "ab", "email": "antq23@gmail.com", "studentId": "12345666", "role": "STUDENT" } ] } ], "error": null }` |
| `/rooms/private`                        | HTTP/1.1 | POST   | `{"targetUserId": 2}` | `{ "message": "success", "status": 200, "data": { "id": 16, "name": "private_2_3", "createdAt": "2025-11-11T16:34:42.944873Z" }, "error": null }` |
| `/submissions`                          | HTTP/1.1 | GET    | `{"page": 1, "size": 1}` | `{ "message": "success", "status": 200, "data": { "meta": { "current": 1, "pageSize": 1, "pages": 18, "total": 18 }, "result": [ { "id": 54, "inputData": "yBvzrAtllibg", "studentResult":"addaadaa` |
| `/submissions/by-qcode/{qCode}`         | HTTP/1.1 | GET    | `{"qCode": "x77snUdo", "page": 1, "size": 1}` | `{ "message": "success", "status": 200, "data": { "meta": { "current": 1, "pageSize": 1, "pages": 4, "total": 4 }, "result": [ { "id": 47, "inputData": "IHNVYPBJPTSRPQLCY;2", "studentResult": "TimeLimitExceeded", "expectedResult": "GFLTWNZHNRQPNOJAW", "correct": false, "createdAt": "2025-11-15T04:46:40.013251Z", "status": "Sai", "user": { "id": 3, "name": "Phùng Đức Bách", "email": "bachpd@gmail.com", "studentId": "B22DCCN055", "role": "STUDENT" }, "problem": { "id": 2, "title": "Giải mã Caesar (dịch chuyển ký tự)", "description": "Mật mã caesar, còn gọi là mật mã dịch chuyển, để giải mã thì mỗi ký tự nhận được sẽ được thay thế bằng một ký tự cách nó một đoạn s. \nVí dụ: với s = 3 thì ký tự “A” sẽ được thay thế bằng ký tự “D”.\nMột chương trình server cho phép kết nối qua giao thức TCP tại cổng 2207 (hỗ trợ thời gian giao tiếp tối đa cho mỗi yêu cầu là 5s). \nYêu cầu là xây dựng chương trình client tương tác với server trên, sử dụng các luồng byte (DataInputStream/DataOutputStream) để trao đổi thông tin theo thứ tự:\na. Gửi một chuỗi gồm mã sinh viên và mã câu hỏi theo định dạng \"studentCode;qCode\". Ví dụ: \"B15DCCN999;D68C93F7\"\nb. Nhận lần lượt chuỗi đã bị mã hóa caesar và giá trị dịch chuyển s nguyên\nc. Thực hiện giải mã ra thông điệp ban đầu và gửi lên Server\nd. Đóng kết nối và kết thúc chương trình.", "protocolType": "tcp", "type": "tcp-byte", "ioType": "DATA", "solved": false, "qcode": "x77snUdo" } } ] }, "error": null }` |
| `/submissions/user/ranking`             | HTTP/1.1 | GET    | `{"page": 1, "size": 3}` | `{ "message": "success", "status": 200, "data": { "meta": { "current": 1, "pageSize": 3, "pages": 2, "total": 5 }, "result": [ { "user": { "id": 3, "name": "Phùng Đức Bách", "email": "bachpd@gmail.com", "studentId": "B22DCCN055", "role": "STUDENT" }, "totalSubmissions": 18, "correctSubmissions": 4 }, { "user": { "id": 2, "name": "Trần Quốc An", "email": "antq@gmail.com", "studentId": "B22DCCN007", "role": "STUDENT" }, "totalSubmissions": 30, "correctSubmissions": 4 }, { "user": { "id": 5, "name": "ab", "email": "antq23@gmail.com", "studentId": "12345666", "role": "STUDENT" }, "totalSubmissions": 0, "correctSubmissions": 0 } ] }, "error": null }` |
| `/submit-file/problems/{qcode}/upload`  | HTTP/1.1 | POST   | `{ "file": "Test16.java", "qCode": "x77snUdo" }` | `{ "message": "success", "status": 200, "data": { "id": 15, "filePath": "source\\server\\public\\submissions\\2\\1763301018182_Test16.java", "createdAt": "2025-11-16T13:50:18.203860500Z", "problem": { "id": 2, "title": "Giải mã Caesar (dịch chuyển ký tự)", "description": "...", "protocolType": "tcp", "type": "tcp-byte", "ioType": "DATA", "solved": false, "qcode": "x77snUdo" } }, "error": null }` |
| `/submit-file/me`                       | HTTP/1.1 | GET    | `{"page": 1, "size": 1}` | `{ "message": "success", "status": 200, "data": { "meta": { "current": 1, "pageSize": 1, "pages": 6, "total": 6 }, "result": [ { "id": 15, "filePath": "source\\server\\public\\submissions\\2\\1763301018182_Test16.java", "createdAt": "2025-11-16T13:50:18.191103Z", "problem": { "id": 2, "title": "Giải mã Caesar (dịch chuyển ký tự)", "description": "...", "protocolType": "tcp", "type": "tcp-byte", "ioType": "DATA", "solved": true, "qcode": "x77snUdo" } } ] }, "error": null }` |
| `/submit-file/submissions/{id}/content` | HTTP/1.1 | GET    | `{"id": 15}` | `{ "message": "success", "status": 200, "data": { "message": "import java.io.*;\r\nimport java.util.*;\r\n\r\npublic class Test16 {\r\n    public static void main(String[] args) throws IOException {\r\n        Scanner sc = new Scanner(System.in);\r\n        int n = sc.nextInt();\r\r\n... (file content)" }, "error": null }` |

---

## 📊 KẾT QUẢ THỰC NGHIỆM

> Đưa ảnh chụp kết quả hoặc mô tả log chạy thử.

![Demo Result](./statics/result.png)

---

## 🧩 CẤU TRÚC DỰ ÁN

```
mid-project-007054055/
├── source
│   ├── client
│   │   ├── src
│   │   │   ├── app
│   │   │   │   ├── login
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── problems
│   │   │   │   │   └── [qcode]
│   │   │   │   │       └── page.tsx
│   │   │   │   ├── ranking
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── register
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── submission-file
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── submissions
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── StoreProvider.tsx
│   │   │   │   ├── layout.tsx
│   │   │   │   └── page.tsx
│   │   │   ├── components
│   │   │   │   ├── client
│   │   │   │   │   ├── Chat
│   │   │   │   │   │   ├── Chat.modal.tsx
│   │   │   │   │   │   ├── Chat.private.tsx
│   │   │   │   │   │   ├── Message.card.tsx
│   │   │   │   │   │   └── RoomsDrawer.tsx
│   │   │   │   │   └── Header
│   │   │   │   │       └── Header.tsx
│   │   │   │   └── layout
│   │   │   │       └── LayoutApp.tsx
│   │   │   ├── config
│   │   │   │   └── api.ts
│   │   │   ├── hooks
│   │   │   │   └── debounce.input.tsx
│   │   │   ├── lib
│   │   │   │   ├── redux
│   │   │   │   │   ├── slice
│   │   │   │   │   │   ├── auth.slice.ts
│   │   │   │   │   │   └── chat.slice.ts
│   │   │   │   │   ├── hooks.ts
│   │   │   │   │   └── store.ts
│   │   │   │   └── antd.registry.tsx
│   │   │   ├── styles
│   │   │   │   ├── Chat.module.scss
│   │   │   │   ├── ClientLayout.scss
│   │   │   │   ├── Header.module.scss
│   │   │   │   ├── Home.module.scss
│   │   │   │   ├── Login.module.scss
│   │   │   │   ├── Problem.module.scss
│   │   │   │   └── Register.module.scss
│   │   │   ├── types
│   │   │   │   └── backend.d.ts
│   │   │   └── utils
│   │   │       └── socket.ts
│   │   ├── .eslintrc.json
│   │   ├── .gitignore
│   │   ├── README.md
│   │   ├── next-env.d.ts
│   │   ├── next.config.mjs
│   │   ├── package-lock.json
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── server
│   │   ├── .mvn
│   │   │   └── wrapper
│   │   │       └── maven-wrapper.properties
│   │   ├── src
│   │   │   ├── main
│   │   │   │   ├── java
│   │   │   │   │   └── com
│   │   │   │   │       └── example
│   │   │   │   │           └── test
│   │   │   │   │               ├── config
│   │   │   │   │               │   ├── CustomAuthenticationEntryPoint.java
│   │   │   │   │               │   ├── CustomCorsConfiguration.java
│   │   │   │   │               │   ├── GsonConfig.java
│   │   │   │   │               │   ├── HandlerInfo.java
│   │   │   │   │               │   ├── HandlerRegistry.java
│   │   │   │   │               │   ├── JpaConverterJson.java
│   │   │   │   │               │   ├── ModelMapperConfig.java
│   │   │   │   │               │   ├── NimbusConfig.java
│   │   │   │   │               │   ├── RestTemplateConfig.java
│   │   │   │   │               │   ├── SecurityConfiguration.java
│   │   │   │   │               │   ├── ServerCommandLineRunnerConfig.java
│   │   │   │   │               │   ├── SocketIOConfig.java
│   │   │   │   │               │   └── UserDetailCustom.java
│   │   │   │   │               ├── controller
│   │   │   │   │               │   ├── AuthController.java
│   │   │   │   │               │   ├── ChatController.java
│   │   │   │   │               │   ├── HealthController.java
│   │   │   │   │               │   ├── ProblemController.java
│   │   │   │   │               │   ├── RoomController.java
│   │   │   │   │               │   ├── SubmissionController.java
│   │   │   │   │               │   └── SubmissionFileController.java
│   │   │   │   │               ├── core
│   │   │   │   │               │   ├── error
│   │   │   │   │               │   ├── GlobalException.java
│   │   │   │   │               │   └── Response.java
│   │   │   │   │               ├── domain
│   │   │   │   │               │   ├── request
│   │   │   │   │               │   ├── response
│   │   │   │   │               │   ├── Chat.java
│   │   │   │   │               │   ├── Problem.java
│   │   │   │   │               │   ├── Room.java
│   │   │   │   │               │   ├── Submission.java
│   │   │   │   │               │   ├── SubmissionFile.java
│   │   │   │   │               │   └── User.java
│   │   │   │   │               ├── handler
│   │   │   │   │               │   ├── tcp
│   │   │   │   │               │   ├── udp
│   │   │   │   │               │   └── ProblemHandler.java
│   │   │   │   │               ├── repository
│   │   │   │   │               │   ├── ChatRepository.java
│   │   │   │   │               │   ├── ProblemRepository.java
│   │   │   │   │               │   ├── RoomRepository.java
│   │   │   │   │               │   ├── SubmissionFileRepository.java
│   │   │   │   │               │   ├── SubmissionRepository.java
│   │   │   │   │               │   └── UserRepository.java
│   │   │   │   │               ├── rmi
│   │   │   │   │               │   ├── byteservice
│   │   │   │   │               │   ├── characterservice
│   │   │   │   │               │   ├── ByteService.java
│   │   │   │   │               │   ├── CharacterService.java
│   │   │   │   │               │   └── RmiServer.java
│   │   │   │   │               ├── service
│   │   │   │   │               │   ├── AuthService.java
│   │   │   │   │               │   ├── ChatService.java
│   │   │   │   │               │   ├── JwtService.java
│   │   │   │   │               │   ├── ProblemService.java
│   │   │   │   │               │   ├── RoomService.java
│   │   │   │   │               │   ├── SocketService.java
│   │   │   │   │               │   ├── SubmissionFileService.java
│   │   │   │   │               │   ├── SubmissionService.java
│   │   │   │   │               │   └── UserService.java
│   │   │   │   │               ├── socket
│   │   │   │   │               │   ├── tcp
│   │   │   │   │               │   ├── udp
│   │   │   │   │               │   └── websocket
│   │   │   │   │               ├── utils
│   │   │   │   │               │   └── FormatResponse.java
│   │   │   │   │               └── TestApplication.java
│   │   │   │   └── resources
│   │   │   │       ├── static
│   │   │   │       │   └── favicon.ico
│   │   │   │       └── application.yml
│   │   │   └── test
│   │   │       └── java
│   │   │           └── com
│   │   │               └── example
│   │   │                   └── test
│   │   │                       └── TestApplicationTests.java
│   │   ├── .gitignore
│   │   ├── README.md
│   │   ├── mvnw
│   │   ├── mvnw.cmd
│   │   └── pom.xml
│   └── .gitignore
├── statics
│   ├── diagram.png
│   └── logo.png
├── INSTRUCTION.md
└── README.md
```

---

## 🧩 HƯỚNG PHÁT TRIỂN THÊM

> Nêu ý tưởng mở rộng hoặc cải tiến hệ thống.

- [ ] Cải thiện giao diện người dùng
- [ ] Thêm tính năng phân quyền
- [ ] Tối ưu hóa hiệu suất
- [ ] Logging, Monitoring & Alerts
- [ ] CI/CD và test automation
- [ ] Triển khai trên cloud / containerization
- [ ] Cung cấp dashboard thống kê (thời gian chấm, tỉ lệ đúng, phổ lỗi).
- [ ] Hỗ trợ đa ngôn ngữ
- [ ] Thêm chỉ báo trạng thái (user online/offline).

---

## 📝 GHI CHÚ

- Repo tuân thủ đúng cấu trúc đã hướng dẫn trong `INSTRUCTION.md`.
- Đảm bảo test kỹ trước khi submit.

---

## 📚 TÀI LIỆU THAM KHẢO

> (Nếu có) Liệt kê các tài liệu, API docs, hoặc nguồn tham khảo đã sử dụng.
