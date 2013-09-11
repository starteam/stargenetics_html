var model = {
    genetics: {
        visualizer: {name:'fly'},
        genome: {
            chromosomes: {
                'C_1': {
                    name: 'Chromosome 1',
                    genes: [
                        { name: 'red_eyes',
                            position: 25,
                            alleles: [
                                {name: 'A'},
                                {name: 'a'}
                            ]
                        },
                        { name: 'wingless',
                            position: 40,
                            alleles: [
                                {name: 'B'},
                                {name: 'b'}
                            ]
                        }

                    ]
                }
            }
        },
        engine: {
            sex_type: 'XY',
            male_recombination_rate: 1,
            female_recombination_rate: 1,
            female_sex_ratio:.51,
            twinning: 0,
            identical_twins_frequency: 0,
            avg_offspring_count: 50
        },
        experiments: {},
        phenotype_rules: [
            {   name: 'default',
                matches: '*',
                phenotype: {
                    wings: 1,
                    eyes: 'red'
                }
            },
            {
                name: 'white eyes',
                matches: 'aa',
                phenotype: {
                    eyes: 'white'
                }
            },
            {
                name: 'wingless',
                matches: 'bb',
                phenotype: {
                    wings: 0
                }
            }
        ],
        gel_rules: {},
        model_metadata: {}
    }
};