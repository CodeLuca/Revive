
  //Anti-Spam Logic
/*  for (var i = 0; i < ips.length; i++) {
   console.log(ips[i].ip.toString());
    if(ips[i].ip.toString()  == req.body.ip.toString()){
     if(Date.now() - ips[i].time > 60000){
        ips.splice(i, 1);
      } else {
         var time = 60000-(Date.now() - ips[i].time);
         i = ips.length + 1;
         res.send('');
         return;
     }
    }
  }; */

  //Succes code = 200;

      bcrypt.compare(pass, newPass, function(err, result) {
      console.log(err, result);
    });
