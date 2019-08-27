<?php
include("config.php");
// session_start();

$error = '';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // username and password sent from form 
    $username = $_POST['username'];
    $password = $_POST['password'];
    $password2 = $_POST['password2'];

    //User exists?
    $sql = "SELECT * FROM usuarios WHERE nombre='$username'";
    $result = mysqli_query($db, $sql);
    $resultado_sql = mysqli_fetch_array($result, MYSQLI_ASSOC);

    // var_dump($username);
    // $sentencia_nombre = $db->prepare($sql);
    // $sentencia_nombre->execute(array($username));
    // $resultado_sql = $sentencia_nombre->fetch();

    if ($resultado_sql) {
        // echo 'usuario existente';
        $error = 'Usuario Existente';
    } else {
      if (!$password) {
        $error='Password vacio';
        } else {
            $password = password_hash($password, PASSWORD_DEFAULT);

            if (password_verify($password2, $password)) {
                // echo '¡La contraseña es válida!';
        
                $sql_insert = "INSERT INTO usuarios(nombre,contrasena) VALUES ('$username','$password')";
                $result_i = $db->query($sql_insert);
               
                // var_dump($result_i);
        
                if ($result_i) {
                    $error= 'Usuario Agregado';
                    header('location:login.php');
                } else {
                    $error= 'Error al Agregar';
                }
        
                // cerrar conecion bd
                $result_i = null;
                $db = null;
        
               

            } else {
                echo 'La contraseña no es válida.';
            }

        }
    }
   
    // echo '<pre>';
    // var_dump($username);
    // var_dump($password);
    // var_dump($password2);
    // echo '</pre>';
}
?>

<!doctype html>
<html lang="es">

<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link rel="stylesheet" href="../css/styles.css">
    <script src="https://kit.fontawesome.com/de8261cad4.js"></script>
    <title>Login</title>
</head>

<body>
    <div class="wrapper fadeInDown">
        <div id="formContent">
            <!-- Tabs Titles -->

            <!-- Icon -->
            <div class="fadeIn first p-3 ">
                <span style="font-size:3rem;">
                    <i class="fas fa-user-plus"></i>
                </span>
            </div>

            <!-- Login Form -->
            <form action="" method="POST">
                <input type="text" id="login" class="fadeIn second" name="username" placeholder="usuario">
                <input type="password" id="password" class="fadeIn third" name="password" placeholder="password">
                <input type="password" id="password" class="fadeIn third" name="password2" placeholder=" repetir password">
                <br>
                <button type="submit" class="btn btn-primary p-2 m-3">Enviar</button>
            </form>

            <h4 class="text-danger">
                <?php if ($error) {
                    echo $error;
                }  ?>
            </h4>

        </div>
    </div>

    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
</body>

</html>