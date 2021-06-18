<?php

use Illuminate\Database\Seeder;

class SchoolSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('schools')->truncate();
        DB::table('schools')->insert([
            [
                'name' => 'ODM SCHOOL',
                'address' => 'patia,bhubaneswar,odisha,pin-751024',
                'phone' => '+912345654345',
                'school_medium' => 'CBSE'
            ]
        ]);
    }
}
