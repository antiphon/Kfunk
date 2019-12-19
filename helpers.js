// Isotropices set covariance function for rect window
function iso_set_cov(width, height, R) 
{
    let a = Math.min(width, height);
    let b = Math.max(width, height);
    var pi = Math.PI;
    let A = a*b;
    var d = b/a; //ratio
    var x = R/Math.sqrt(A/d);
    var V = A/pi;
    var res = 0;
    if(x <= 1) {
      res = V * ( pi - 2*x - 2*x/d + x*x/d );
    }
    else if(x <= d){
      let u = Math.sqrt(x*x-1);
      res = V * ( 2*Math.asin(1/x) - 1/d - 2*(x-u) );
    }
    else if( x < Math.sqrt(d*d+1)){
      let u = Math.sqrt(x*x-1);
      let v = Math.sqrt(x*x-d*d);
      res = V * ( 2*Math.asin((d-u*v)/x*x) + 2*u + 2*v/d - d - (1+x*x)/d );
    }
    else res=0;

    return res;
}

function double_integral_ball(width, height, R) 
{
    var n = 500;
    var I = 0;
    var r;
    for(let i=0; i < n; i++){
        r  = i/(n-1) * R;
        I += r * iso_set_cov(width, height, r);
    }
    I *= 2 * Math.PI * R / n;
    return I;
}



function loadCSV(file) {
    var data = fetch(file);
    return extractData(data);
  }
 
function extractData(res) {
    let csvData = res || '';
    var out = '';
    Papa.parse(csvData, {
      complete: parsedData => {
        out = parsedData.data;
      }
    });
    return out;
  };