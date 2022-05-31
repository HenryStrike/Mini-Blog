let is_collision = (r1, r2) => {
    if(Math.max(r1.x1, r2.x1)>Math.min(r1.x2, r2.x2)){
        return false;
    }else if(Math.max(r1.y1, r2.y1)>Math.min(r1.y2, r2.y2)){
        return false;
    }else{
        return true;
    }
}

export{
    is_collision
}