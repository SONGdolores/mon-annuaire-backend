import { PrismaClient } from "@prisma/client";
import * as process from 'process';
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();

console.log('--------------');

async function main() {

  console.log('Debut des seeders');

  const accesApp = await prisma.permission.create({
    data: {
      nom: "ACCESS_APP",
      description: "Access a l'application",
    },
  });

  const creer_utilisateur = await prisma.permission.create({
    data: {
      nom: "CREER_UTILISATEUR",
      description: "creer un utilisateur",
    },
  })

  const lister_utilisateur = await prisma.permission.create({
    data: {
      nom: "LIST_USER",
      description: "Lister les utilisateurs",
    },
  })

  const modifier_utilisateur = await prisma.permission.create({
    data: {
      nom: "UPDATE_UTILISATEUR",
      description: "Mettre a jour un utilisateur",
    },
  })

  const supprimer_utilisateur = await prisma.permission.create({
    data: {
      nom: "DELETE_UTILISATEUR",
      description: "Supprimer un utilisateur",
    },
  })


  const creer_permission = await prisma.permission.create({
    data: {
      nom: "CREER_PERMISSION",
      description: "creer une permission",
    },
  })

  const lister_permission = await prisma.permission.create({
    data: {
      nom: "LIST_PERMISSION",
      description: "Lister les permissions",
    },
  })

  const modifier_permission = await prisma.permission.create({
    data: {
      nom: "UPDATE_PERMISSION",
      description: "Mettre a jour une permission",
    },
  })

  const supprimer_permission = await prisma.permission.create({
    data: {
      nom: "DELETE_PERMISSION",
      description: "Supprimer une permission",
    },
  })


  const creer_role = await prisma.permission.create({
    data: {
      nom: "CREER_ROLE",
      description: "creer un role",
    },
  })

  const lister_role = await prisma.permission.create({
    data: {
      nom: "LIST_ROLE",
      description: "Lister les roles",
    },
  })

  const modifier_role = await prisma.permission.create({
    data: {
      nom: "UPDATE_ROLE",
      description: "Mettre a jour un role",
    },
  })

  const supprimer_role = await prisma.permission.create({
    data: {
      nom: "DELETE_ROLE",
      description: "Supprimer un role",
    },
  })

  const admin = await prisma.role.create({
    data: {
      nom: "Admin",
      code: "Admin",
      description: "Il administre la plateforme",
      permissions: {
        connect: [
          { id: accesApp.id },
          { id: creer_utilisateur.id },
          { id: lister_utilisateur.id },
          { id: modifier_utilisateur.id },
          { id: supprimer_utilisateur.id },
          { id: creer_permission.id },
          { id: lister_permission.id },
          { id: modifier_permission.id },
          { id: supprimer_permission.id },
          { id: creer_role.id },
          { id: lister_role.id },
          { id: modifier_role.id },
          { id: supprimer_role.id },
        ]
      }
    }
  })

  const defaultPassword = await bcrypt.hash("azerty", 10);

  const Admin = await prisma.utilisateur.create({
    data: {
      login: "admin",
      mot_de_passe: defaultPassword,
      role: {
        connect: { id: admin.id },
      },
    },
  })

  const editeurRole = await prisma.role.create({
    data: {
      nom: "Editeur",
      code: "Editeur",
      description: "Il a accès a une partie de la plateforme",
      permissions: {
        connect: [
          { id: accesApp.id },
        ]
      }
    }

  })


  const editeur = await prisma.utilisateur.create({
    data: {
      login: "editeur",
      mot_de_passe: defaultPassword,
      role: {
        connect: { id: editeurRole.id },
      },
    },
  })

  const villes = [
    { nom: "Libreville" },
    { nom: "Port-Gentil" },
    { nom: "Franceville" },
    { nom: "Oyem" },
    { nom: "Moanda" },
    { nom: "Lambaréné" },
    { nom: "Tchibanga" },
    { nom: "Makokou" },
    { nom: "Bitam" },
    { nom: "Mouila" },
  ];

  for (const ville of villes) {
    console.log(ville)
    await prisma.ville.create({
      data: ville,
    });
  }

  console.log("Seed des villes du Gabon terminé ✅");

  const typesAdministration = [
    { libelle: "Ministère" },
    { libelle: "Direction" },
    { libelle: "Préfecture" },
    { libelle: "Agence" },
    { libelle: "Mairie" },
    { libelle: "Administration sociale" },
    { libelle: "Institution judiciaire" },
  ];

  for (const type of typesAdministration) {
    await prisma.typeAdministration.create({ data: type });
  }
  console.log("Seed des types d'administration terminé ✅");
}


main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });