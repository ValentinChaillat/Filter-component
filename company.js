import React from "react";
import { connect } from "react-redux";
import "styles/index.scss";
import "../Serveur/serveur.js";
import { entreprises } from "../Serveur/serveur.js";
import { injectIntl } from "react-intl";
import { FormattedMessage } from "react-intl";
class Company extends React.Component {
  state = {
    plusDinfo: 0,
    hidePlusDinfo: false,
    nb: 3,
    nbEntreprises: 30,
  };

  // showMoreCompany() {
  //   const postDatas = [];
  //   for (let i = 0; i < this.state.nb; i++) {
  //     postDatas.push(postData[i]);
  //   }
  // }

  render() {
    const {
      showPcba,
      filtreType = [],
      filtreLangue = [],
      filtreNombreCouche,
      filtreNombreCouche2,
      filtreDelay,
      filtreMateriaux,
      filtreFinitions,
      filtreRigide,
      filtreVia,
      filtreCouleurs,
    } = this.props;
    //const getLastItemInMap = (map) => Array.from(map)[map.size - 1];

    showPcba === true ? filtreType.push("pcba") : filtreType.push("pcb");

    var entreprisesFiltres = entreprises.filter((entreprises) =>
      showPcba === false
        ? (entreprises.type.indexOf(filtreType[0]) > -1) &
          (filtreLangue !== "All"
            ? entreprises.langue.indexOf(filtreLangue) > -1
            : true) &
          (entreprises.nombreCouche >= filtreNombreCouche) &
          (filtreMateriaux !== "All"
            ? entreprises.materiaux.indexOf(filtreMateriaux) > -1
            : true) &
          (filtreFinitions !== "All"
            ? entreprises.finitions.indexOf(filtreFinitions) > -1
            : true) &
          (filtreRigide !== "All"
            ? entreprises.rigidité.indexOf(filtreRigide) > -1
            : true) &
          (filtreVia !== "All"
            ? entreprises.via.indexOf(filtreVia) > -1
            : true) &
          (filtreCouleurs !== "Toute"
            ? entreprises.couleursVernis.indexOf(filtreCouleurs) > -1
            : true)
        : (entreprises.type.indexOf(filtreType[0]) > -1) &
          (filtreLangue !== "All"
            ? entreprises.langue.indexOf(filtreLangue) > -1
            : true) &
          (entreprises.quantité >= filtreNombreCouche2) &
          (entreprises.delais <= filtreDelay)
    );

    const lang = this.props.intl.locale;

    const postData = entreprisesFiltres.length ? (
      entreprisesFiltres.map((post) => {
        return (
          <div key={post.id} className="mb-3 ">
            {post.id > 0 ? (
              <div className="companyContent col-12 row pt-2 m-0">
                <div className="col-2 text-center p-0 m-0">
                  <img
                    classname="mt-5 mt-md-0"
                    alt={"logo of " + post.name}
                    src={post.logo}
                  ></img>
                </div>
                <div className=" col-lg-9 col-12 row p-0 m-0 ">
                  <h3 className="col-12">{post.name}</h3>
                  <p className="col-12">
                    {post.description[lang]
                      ? post.description[lang]
                      : post.description["en"]
                      ? post.description["en"]
                      : "No description"}
                  </p>
                  <button
                    className="col-6 col-lg-5 my-3 button1  "
                    onClick={(e) =>
                      this.setState({
                        plusDinfo:
                          this.state.plusDinfo === post.id ? null : post.id,
                      })
                    }
                  >
                    <label className="" for="plusDinfo">
                      <FormattedMessage
                        id="marketing.company.moreInfo"
                        defaultMessage="Plus d'information"
                      />
                    </label>
                  </button>

                  <a
                    href={post.lienSite}
                    className="col-6 col-lg-5 my-3 px-1  "
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="button2 col-12" href={post.lienSite}>
                      {post.name}.com
                    </button>
                  </a>
                </div>

                {this.state.plusDinfo === post.id ? (
                  <div className="col-12 row m-0 p-2">
                    <div className="caracteristique col-12 row m-0 p-0">
                      <h4 className="col-12">
                        <FormattedMessage
                          id="marketing.company.carac"
                          defaultMessage="Caractéristiques de l'entreprise:"
                        />
                      </h4>
                      <div className="col-12 row caracTableau m-0 p-0">
                        <p className="col-sm-2 col-3 tableauCol1 text-center ">
                          <FormattedMessage
                            id="marketing.company.lang"
                            defaultMessage="Langue"
                          />
                        </p>
                        <p className="col-sm-10 col-9 tableauCol2 p-1">
                          {post.langue.map((x, i) =>
                            i + 1 === post.langue.length ? x : x + " - "
                          )}
                        </p>
                        <p className="col-sm-2 col-3 tableauCol1 text-center">
                          <FormattedMessage
                            id="marketing.company.nbCouche"
                            defaultMessage="Nombre de couche max"
                          />
                        </p>
                        <p className="col-sm-10 col-9 tableauCol2 p-1">
                          {post.nombreCouche}
                        </p>
                        {post.materiaux.length > 0 ? (
                          <p className="col-sm-2 col-3 tableauCol1 text-center ">
                            <FormattedMessage
                              id="marketing.company.materiaux"
                              defaultMessage="materiaux"
                            />
                          </p>
                        ) : null}
                        {post.materiaux.length > 0 ? (
                          <p className="col-sm-10 col-9 tableauCol2 p-1">
                            {post.materiaux.map((x, i) =>
                              i + 1 === post.materiaux.length ? x : x + " - "
                            )}
                          </p>
                        ) : null}
                        {post.finitions.length > 0 ? (
                          <p className="col-sm-2 col-3 tableauCol1 text-center ">
                            <FormattedMessage
                              id="marketing.company.finitions"
                              defaultMessage="finitions"
                            />
                          </p>
                        ) : null}
                        {post.finitions.length > 0 ? (
                          <p className="col-sm-10 col-9 tableauCol2 p-1">
                            {post.finitions.map((x, i) =>
                              i + 1 === post.finitions.length ? x : x + " - "
                            )}
                          </p>
                        ) : null}
                        <p className="col-sm-2 col-3 tableauCol1 text-center">
                          <FormattedMessage
                            id="marketing.company.rigidité"
                            defaultMessage="Rigidité"
                          />
                        </p>
                        <p className="col-sm-10 col-9 tableauCol2 p-1">
                          {/* {post.rigidité.map((x) => x + " - ")} */}
                          {post.rigidité.map((x, i) =>
                            i + 1 === post.rigidité.length ? x : x + " - "
                          )}
                        </p>
                        <p className="col-sm-2 col-3 tableauCol1 text-center">
                          <FormattedMessage
                            id="marketing.company.via"
                            defaultMessage="Via"
                          />
                        </p>
                        <p className="col-sm-10 col-9 tableauCol2 p-1">
                          {post.via.map((x, i) =>
                            i + 1 === post.via.length ? x : x + " - "
                          )}
                        </p>
                        {post.couleursVernis.length > 0 ? (
                          <p className="col-sm-2 col-3 tableauCol1 text-center">
                            <FormattedMessage
                              id="marketing.company.couleursvernis"
                              defaultMessage="Couleurs vernis"
                            />
                          </p>
                        ) : null}
                        {post.couleursVernis.length > 0 ? (
                          <p className="col-sm-10 col-9 tableauCol2 p-1">
                            {post.couleursVernis.map((x, i) =>
                              i + 1 === post.couleursVernis.length
                                ? x
                                : x + " - "
                            )}
                          </p>
                        ) : null}
                      </div>
                    </div>
                    {console.log("post rigidité: ", post.rigidité)}

                    <div className="col-12 py-2"></div>
                    {post.projet === true ? (
                      <div className="caracteristique col-12 row m-0 p-0">
                        <h4 className="col-12">
                          <FormattedMessage
                            id="marketing.company.projet"
                            defaultMessage="Projet type: "
                          />
                          {post.titreProjet}
                        </h4>
                        <div className="col-12 row projetTableau m-0 ">
                          <div className="col-7 projetCol1">
                            <p className="">{post.descriptionProjet}</p>
                          </div>
                          <div className="col-4 row projetCol2">
                            <img
                              className="col-6"
                              alt="projet type"
                              src={post.logo}
                            ></img>
                            <p className="col-6">
                              <FormattedMessage
                                id="marketing.company.projetPrix"
                                defaultMessage="Prix: "
                              />{" "}
                              {post.prixProjet}
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
        );
      })
    ) : (
      <p>
        <FormattedMessage
          id="marketing.company.noCompany"
          defaultMessage="Aucune entreprise"
        />
      </p>
    );
    // const postDatas = postData;
    // // for (let i = 0; i < this.state.nb; i++) {
    // //   postDatas.push(postData[i]);
    // // }

    return (
      <div>
        <p className="col-12 compteur p-0 m-0">
          <FormattedMessage
            id="marketing.company.info"
            defaultMessage="Entreprises affichées:"
          />
          {entreprisesFiltres.length} / {entreprises.length}
        </p>
        {postData}

        {/* <buton onClick={this.showMoreCompany()}>+30</buton> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    posts: state.posts,
  };
};

export default injectIntl(connect(mapStateToProps)(Company));
