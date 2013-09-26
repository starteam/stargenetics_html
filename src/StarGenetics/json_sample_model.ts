export var model1 = {
    "genetics": {
        "visualizer": {"name": "fly"},
        "genome": {
            "chromosomes": {
                "C_1": {
                    "name": "Chromosome 1",
                    "genes": [
                        { "name": "red_eyes",
                            "position": 25,
                            "alleles": [
                                {"name": "A"},
                                {"name": "a"}
                            ]
                        },
                        { "name": "wingless",
                            "position": 40,
                            "alleles": [
                                {"name": "B"},
                                {"name": "b"}
                            ]
                        }

                    ]
                }
            }
        },
        "engine": {
            "sex_type": "XY",
            "male_recombination_rate": 1,
            "female_recombination_rate": 1,
            "female_sex_ratio": .51,
            "twinning": 0,
            "identical_twins_frequency": 0,
            "avg_offspring_count": 50
        },
        "experiments": {},
        "phenotype_rules": [
            {   name: 'default',
                matches: '*',
                phenotype: {
                    bodycolor: {
                        text: 'yellow',
                        value: 'yellow'
                    },
                    mouth: {
                        text: 'Happy',
                        value: 'happy'
                    },
                    eyes: {
                        text: 'Circle Eyes',
                        value: 'circle'
                    }
                }
            },
            {
                name: 'white eyes',
                matches: 'a,a',
                phenotype: {
                    bodycolor: {
                        text: 'white',
                        value: 'white'
                    }
                }
            },
            {
                name: 'wingless',
                matches: 'b,b',
                phenotype: {
                    mouth: {
                        text: 'Sad',
                        value: 'sad'
                    },
                    eyes: {
                        text: 'Cross Eyes',
                        value: 'cross'
                    }
                }
            }
        ],
        "gel_rules": {},
        "model_metadata": {},
        "strains": {
            "initial": {
                "name": "Initial Strains",
                "list": [
                    {"name": "Wildtype M", "sex": "M", "alleles": [ "A,A" , "B,B" ]},
                    {"name": "Wildtype F", "sex": "F", "alleles": [ "A,A" , "B,B" ]},
                    {"name": "Double Mutant M", "sex": "M", "alleles": [ "a,a" , "b,b" ]},
                    {"name": "Double Mutant F", "sex": "F", "alleles": [ "a,a" , "b,b" ]}
                ]
            }
        }
    }
}