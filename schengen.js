//Schegen DOM Parser
//Edwin Villanueva 12.01.2014

(function(){
    window.addEventListener('load', function(){
        function Schengen(){
            this.schengen_countries = [];
            this.eu_countries = [];
            this.candidates = [];
            this.pot_candidates = [];

            // hold this of object
            var self = this;

            // searching for class
            this.classify = function(country){
                var _class = [];
                var re = new RegExp(country.toLowerCase());
                // check to see if they are EU
                for (eu in self.eu_countries){
                    var name = (self.eu_countries[eu].name).toLowerCase();
                    if (name.match(re)) {
                        _class.push("EU");
                    }
                };
                // check to see if they are Candidate
                for (cand in self.candidates){
                    var name = (self.candidates[cand].name).toLowerCase();
                    if (name.match(re)) {
                        _class.push("Candidate");
                    }
                };

                // check to see if they are Potential Candidate
                for (pot in self.pot_candidates){
                    var name = (self.pot_candidates[pot].name).toLowerCase();
                    if (name.match(re)) {
                        _class.push("Potential Candidate");
                    }
                };
                return _class.join(" ");

            };

            function init(){
                //get lists from pg
                var uls = document.getElementsByTagName('ul');



                // get EU countries
                var eu = Array.prototype.slice.call(uls[1].children,0);
                self.eu_countries = eu.map(function(el){
                    var re = /(\d+)/gmi;
                    var year = re.exec(el.textContent)[1];
                    return {name: el.textContent,
                            year: year};
                });
                // get candidates
                var cand = Array.prototype.slice.call(uls[2].children,0);
                self.candidates = cand.map(function(el){

                    return {name: el.textContent};
                });
                // get potential candidates
                var pot = Array.prototype.slice.call(uls[3].children,0);
                self.pot_candidates = pot.map(function(el){
                    return {name: el.textContent};
                });



                //countries which support the Schengen visa
                //produce a static copy
                var schengen = Array.prototype.slice.call(uls[0].children,0);
                self.schengen_countries = schengen.map(function(el){
                    return {name: el.textContent,
                            class: self.classify(el.textContent)
                                            };
                });



            };


            this.getCountries = function(start, til){
                function isBetween(el){
                    if (el.year >= start && el.year <= til) {
                        return true;
                    }
                }
                return this.eu_countries.filter(isBetween);
            };

            init();
        }




        // Tests
        var schengen = new Schengen();

        console.log(schengen);

//        //A list of Countries which support the Schengen Visa
//        console.log(schengen.schengen_countries);
//
//        console.log(schengen.getCountries(1,2));
//        console.log(schengen.getCountries(1,2000)[0].name);
    });
})();


