# MODULE SERVER

> 📘 _Sinh viên mô tả phần **server** tại đây. Điền đầy đủ theo framework và bài toán của nhóm._

---

## 🎯 MỤC TIÊU

Server chịu trách nhiệm:

- Tiếp nhận yêu cầu từ client thông qua các giao thức mạng (TCP/UDP/RMI/HTTP/WebSocket).
- Xử lý nghiệp vụ theo từng dạng bài (mã sinh viên, mã bài, dữ liệu).
- Thực thi thuật toán/tính toán, xác thực dữ liệu và kiểm tra tính hợp lệ.
- Trả kết quả cho client

---

## ⚙️ CÔNG NGHỆ SỬ DỤNG

| Thành phần | Công nghệ                                              |
| ---------- | ------------------------------------------------------ |
| Ngôn ngữ   | Java                                                   |
| Framework  | Spring Boot(Web, Security, WebSocket, JPA, Validation) |
| Database   | MySQL                                                  |

---

## 🚀 HƯỚNG DẪN CHẠY

### Cài đặt

```bash
mvn clean install
```

### Khởi động server

```bash
mvn spring-boot:run
```

Server chạy tại: `http://localhost:8888`

---

## 🔗 API

| Endpoint                                | Method | Input                                                                                           | Output                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| --------------------------------------- | ------ | ----------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/health`                               | GET    | —                                                                                               | `{ "message": "success", "status": 200, "data": { "message": "OK" }, "error": null }`                                                                                                                                                                                                                                                                                                                                                                                   |
| `/auth/login`                           | POST   | `{ "email": "bachpd@gmail.com", "password": "123456" }`                                         | `{ "message": "success", "status": 200, "data": { "user": { "id": 3, "name": "Phùng Đức Bách", "email": "bachpd@gmail.com", "studentId": "B22DCCN055", "role": "STUDENT" }, "access_token": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJiYWNocGRAZ21haWwuY29tIiwiZXhwIjoxNzcxOTM4NTM1LCJpYXQiOjE3NjMyOTg1MzUsInVzZXIiOiJ7XCJuYW1lXCI6XCJQaMO5bmcgxJDhu6ljIELDoWNoXCIsXCJlbWFpbFwiOlwiYmFjaHBkQGdtYWlsLmNvbVwifSJ9.USHAWBV2ptaA-ZZv9fyJgmgF9BuXlVyQb2UHWhwHaEw" }, "error": null }` |
| `/auth/register`                        | POST   | `{ "email": "test@gmail.com", "name": "test", "password": "123456", "studentId": "abc112233" }` | `{ "message": "success", "status": 200, "data": { "name": "test", "email": "test@gmail.com", "password": "123456", "studentId": "abc112233" }, "error": null }`                                                                                                                                                                                                                                                                                                         |
| `/auth/account`                         | GET    | —                                                                                               | `{ "message": "success", "status": 200, "data": { "user": { "id": 3, "name": "Phùng Đức Bách", "email": "bachpd@gmail.com", "studentId": "B22DCCN055", "role": "STUDENT" } }, "error": null }`                                                                                                                                                                                                                                                                          |
| `/auth/refresh`                         | GET    | —                                                                                               | `{ "message": "success", "status": 200, "data": { "user": { "id": 3, "name": "Phùng Đức Bách", "email": "bachpd@gmail.com", "studentId": "B22DCCN055", "role": "STUDENT" }, "access_token": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJiYWNocGRAZ21haWwuY29tIiwiZXhwIjoxNzcxOTM5MTU4LCJpYXQiOjE3NjMyOTkxNTgsInVzZXIiOiJ7XCJuYW1lXCI6XCJQaMO5bmcgxJDhu6ljIELDoWNoXCIsXCJlbWFpbFwiOlwiYmFjaHBkQGdtYWlsLmNvbVwifSJ9.um30JB87wNRbDOkpz6ApgQLIge0xgYKrkhQJt9m56U4" }, "error": null }` |
| `/auth/logout`                          | POST   | —                                                                                               | `{ "message": "success", "status": 200, "data": null, "error": null }`                                                                                                                                                                                                                                                                                                                                                                                                  |
| `/chats`                                | POST   | `{...}`                                                                                         | `{...}`                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `/chats`                                | GET    | —                                                                                               | `{...}`                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `/chats/rooms`                          | GET    | `{...}`                                                                                         | `{...}`                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `/chats/{id}`                           | DELETE | `{...}`                                                                                         | `{...}`                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `/problems`                             | GET    | `{...}`                                                                                         | `{...}`                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `/problems/get-one/{qCode}`             | GET    | `{...}`                                                                                         | `{...}`                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `/rooms/me`                             | GET    | —                                                                                               | `{...}`                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `/rooms/private`                        | POST   | `{...}`                                                                                         | `{...}`                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `/submissions`                          | GET    | `{...}`                                                                                         | `{...}`                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `/submissions/by-qcode/{qCode}`         | GET    | `{...}`                                                                                         | `{...}`                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `/submissions/user/ranking`             | GET    | `{...}`                                                                                         | `{...}`                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `/submit-file/problems/{qcode}/upload`  | POST   | `{...}`                                                                                         | `{...}`                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `/submit-file/me`                       | GET    | `{...}`                                                                                         | `{...}`                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `/submit-file/submissions/{id}/content` | GET    | `{...}`                                                                                         | `{...}`                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |

> **Lưu ý:** Bổ sung các endpoint của nhóm vào bảng trên.

---

## 📦 CẤU TRÚC

```
server/
├── .mvn
│   └── wrapper
│       └── maven-wrapper.properties
├── src
│   ├── main
│   │   ├── java
│   │   │   └── com
│   │   │       └── example
│   │   │           └── test
│   │   │               ├── config
│   │   │               │   ├── CustomAuthenticationEntryPoint.java
│   │   │               │   ├── CustomCorsConfiguration.java
│   │   │               │   ├── GsonConfig.java
│   │   │               │   ├── HandlerInfo.java
│   │   │               │   ├── HandlerRegistry.java
│   │   │               │   ├── JpaConverterJson.java
│   │   │               │   ├── ModelMapperConfig.java
│   │   │               │   ├── NimbusConfig.java
│   │   │               │   ├── RestTemplateConfig.java
│   │   │               │   ├── SecurityConfiguration.java
│   │   │               │   ├── ServerCommandLineRunnerConfig.java
│   │   │               │   ├── SocketIOConfig.java
│   │   │               │   └── UserDetailCustom.java
│   │   │               ├── controller
│   │   │               │   ├── AuthController.java
│   │   │               │   ├── ChatController.java
│   │   │               │   ├── HealthController.java
│   │   │               │   ├── ProblemController.java
│   │   │               │   ├── RoomController.java
│   │   │               │   ├── SubmissionController.java
│   │   │               │   └── SubmissionFileController.java
│   │   │               ├── core
│   │   │               │   ├── error
│   │   │               │   │   ├── BadRequestException.java
│   │   │               │   │   ├── ForbiddenException.java
│   │   │               │   │   └── UnauthorizedException.java
│   │   │               │   ├── GlobalException.java
│   │   │               │   └── Response.java
│   │   │               ├── domain
│   │   │               │   ├── request
│   │   │               │   │   ├── chat
│   │   │               │   │   │   └── CreateChatDTO.java
│   │   │               │   │   ├── room
│   │   │               │   │   │   ├── AddParticipantDTO.java
│   │   │               │   │   │   ├── CreateRoomDTO.java
│   │   │               │   │   │   └── PrivateRoomDTO.java
│   │   │               │   │   ├── user
│   │   │               │   │   │   └── RegisterUserDTO.java
│   │   │               │   │   └── RequestLoginDTO.java
│   │   │               │   ├── response
│   │   │               │   │   ├── chat
│   │   │               │   │   │   └── ResponseChatDTO.java
│   │   │               │   │   ├── problem
│   │   │               │   │   │   ├── ProblemResult.java
│   │   │               │   │   │   └── ResponseProblemDTO.java
│   │   │               │   │   ├── room
│   │   │               │   │   │   └── ResponseRoomDTO.java
│   │   │               │   │   ├── submission
│   │   │               │   │   │   └── ResponseSubmissionDTO.java
│   │   │               │   │   ├── submissionfile
│   │   │               │   │   │   └── ResponseSubmissionFileDTO.java
│   │   │               │   │   ├── user
│   │   │               │   │   │   ├── IUserRank.java
│   │   │               │   │   │   ├── ResponseUserDTO.java
│   │   │               │   │   │   └── ResponseUserRankDTO.java
│   │   │               │   │   ├── ResponseLoginDTO.java
│   │   │               │   │   ├── ResponseMetaDTO.java
│   │   │               │   │   ├── ResponsePaginationDTO.java
│   │   │               │   │   └── ResponseString.java
│   │   │               │   ├── Chat.java
│   │   │               │   ├── Problem.java
│   │   │               │   ├── Room.java
│   │   │               │   ├── Submission.java
│   │   │               │   ├── SubmissionFile.java
│   │   │               │   └── User.java
│   │   │               ├── handler
│   │   │               │   ├── tcp
│   │   │               │   │   ├── BinaryConvertHandler.java
│   │   │               │   │   ├── CaesarDecryptHandler.java
│   │   │               │   │   ├── CollatzRawHandler.java
│   │   │               │   │   ├── DuplicateCharCountHandler.java
│   │   │               │   │   └── SpecialCharFilterHandler.java
│   │   │               │   ├── udp
│   │   │               │   │   ├── MinMaxUdpHandler.java
│   │   │               │   │   ├── SlidingWindowMaxHandler.java
│   │   │               │   │   └── UdpFilterCharsHandler.java
│   │   │               │   └── ProblemHandler.java
│   │   │               ├── repository
│   │   │               │   ├── ChatRepository.java
│   │   │               │   ├── ProblemRepository.java
│   │   │               │   ├── RoomRepository.java
│   │   │               │   ├── SubmissionFileRepository.java
│   │   │               │   ├── SubmissionRepository.java
│   │   │               │   └── UserRepository.java
│   │   │               ├── rmi
│   │   │               │   ├── byteservice
│   │   │               │   │   └── ByteServiceImpl.java
│   │   │               │   ├── characterservice
│   │   │               │   │   └── CharacterServiceImpl.java
│   │   │               │   ├── ByteService.java
│   │   │               │   ├── CharacterService.java
│   │   │               │   └── RmiServer.java
│   │   │               ├── service
│   │   │               │   ├── AuthService.java
│   │   │               │   ├── ChatService.java
│   │   │               │   ├── JwtService.java
│   │   │               │   ├── ProblemService.java
│   │   │               │   ├── RoomService.java
│   │   │               │   ├── SocketService.java
│   │   │               │   ├── SubmissionFileService.java
│   │   │               │   ├── SubmissionService.java
│   │   │               │   └── UserService.java
│   │   │               ├── socket
│   │   │               │   ├── tcp
│   │   │               │   │   ├── TcpBufferedServer.java
│   │   │               │   │   ├── TcpServerData.java
│   │   │               │   │   └── TcpServerRaw.java
│   │   │               │   ├── udp
│   │   │               │   │   └── UdpServer.java
│   │   │               │   └── websocket
│   │   │               │       └── AppGateway.java
│   │   │               ├── utils
│   │   │               │   └── FormatResponse.java
│   │   │               └── TestApplication.java
│   │   └── resources
│   │       ├── static
│   │       │   └── favicon.ico
│   │       └── application.yml
│   └── test
│       └── java
│           └── com
│               └── example
│                   └── test
│                       └── TestApplicationTests.java
├── .gitignore
├── README.md
├── mvnw
├── mvnw.cmd
└── pom.xml
```

---

## 🧪 TEST

```bash
# Test API bằng curl
curl http://localhost:8888/health
```

---

## 📝 GHI CHÚ

- Port mặc định: **8888**
- Có thể thay đổi trong file `application.yml`
