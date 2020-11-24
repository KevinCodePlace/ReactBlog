<?php
  require_once("conn.php");

  $nickname = "admin";
  $username = "admin";
  $password = password_hash("admin", PASSWORD_DEFAULT);

  $sql = "INSERT INTO kevincodeplace_blog_users(nickname,username,password) VALUES(?,?,?)";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("sss",$nickname,$username,$password);
  $result = $stmt->execute();
  
  if ($result) {
    header('Location: ./index.php');
    exit();
  } else {
    if($conn->errno === 1062) {
      die($conn->error); 
    }
  }
?>