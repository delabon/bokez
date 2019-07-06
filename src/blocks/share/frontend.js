const elems = document.querySelectorAll('.bokez-share a')

window.bokezShare = ( url, title, w, h ) => {
    var left = ( window.innerWidth / 2 )-( w / 2 );
    var top  = ( window.innerHeight / 2 )-( h / 2 );
    return window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=600, height=600, top='+top+', left='+left);
}

const url = encodeURIComponent( document.location.href );
const title = encodeURIComponent(document.title);

elems.forEach(el => {
    
    if( el.classList.contains('bokez-share-google') ){
        el.setAttribute( 'onclick', "javascript:bokezShare( 'https://plus.google.com/share?url=" +  url + "', 'Share on Google', '600', '600' ) ");
    }

    else if( el.classList.contains('bokez-share-facebook') ){
        el.setAttribute( 'onclick', "javascript:bokezShare( 'https://www.facebook.com/sharer/sharer.php?u=" +  url + "&title=" + title + "', 'Share on Facebook', '600', '600' ) ");
    }

    else if( el.classList.contains('bokez-share-twitter') ){
        el.setAttribute( 'onclick', "javascript:bokezShare( 'http://twitter.com/share?text=" + title + "&url=" +  url + "', 'Share on Twitter', '600', '600' ) ");
    }

    else if( el.classList.contains('bokez-share-linkedin') ){
        el.setAttribute( 'onclick', "javascript:bokezShare( 'https://www.linkedin.com/shareArticle?mini=true&url=" +  url + "&title=" + title + "', 'Share on Linkedin', '600', '600' ) ");
    }

    else if( el.classList.contains('bokez-share-reddit') ){
        el.setAttribute( 'onclick', "javascript:bokezShare( 'https://www.reddit.com/submit?url=" +  url + "', 'Share on Reddit', '600', '600' ) ");
    }
    
    else if( el.classList.contains('bokez-share-email') ){
        el.setAttribute( 'href', "mailto:?subject=" + title + "&body=" + title + " -- " + url );
    }

})